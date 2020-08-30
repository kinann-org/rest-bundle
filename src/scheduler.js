(function(exports) {
    const EventEmitter = require('events');
    const logger = require("log-instance").LogInstance.singleton;
    const RECUR_NONE = 0;
    const RECUR_DAILY = 24*3600*1000;
    const EVENT_INVOKE = "invoke_task";
    const TASK_SCHEDULED = "scheduled";
    const TASK_DONE = "done";
    const TASK_INVOKED = "invoked";

    class Task {
        constructor(opts={}) {
            this.lastDone = null;
            this.name = opts.name || `T${(Math.round(Math.random()*0x100000)).toString(16)}`;
            this.msRecur = opts.msRecur || RECUR_NONE;
            this.dueDate = opts.dueDate && new Date(opts.dueDate) || new Date();
            this.state = opts.state || TASK_SCHEDULED;
            this.event_invoke = opts.event_invoke || EVENT_INVOKE;
            this.data = opts.data || {};
            logger.info(`Task-${this.name}.ctor()`,
                `dueDate:${this.dueDate && this.dueDate.toISOString()}`,
                `state:${this.state}`,
                `msRecur:${this.msRecur}`,
                `event_invoke:${this.event_invoke}`,
            '');

        }

        static recurDate(msRecur, dueDate=new Date(), afterDate = dueDate) {
            var recurDate = new Date(dueDate);
            var msDay = 24*3600*1000;
            while (recurDate <= afterDate) {
                if ((msRecur % msDay) === 0) { // maintain dueDate HH:MM:SS
                    var dayRecur = msRecur / msDay;
                    recurDate.setDate(recurDate.getDate()+dayRecur); // allow for DST
                } else { // exact time
                    recurDate = new Date(recurDate.getTime() + msRecur);
                }
            } 
            return recurDate;
        }

        updateDueDate(afterDate = this.dueDate) {
            this.dueDate = this.dueDate == null || this.msRecur === RECUR_NONE
                ? null
                : Task.recurDate(this.msRecur, this.dueDate, afterDate);
            return this.dueDate;
        }

        done(result) {
            this.result = result;
            this.lastDone = new Date();
            this.state = this.msRecur === RECUR_NONE
                ? Scheduler.TASK_DONE : Scheduler.TASK_SCHEDULED;
            if (result instanceof Error) {
                logger.warn(`Task-${this.name}.done(Error)`,
                    `dueDate:${this.dueDate && this.dueDate.toISOString()}`,
                    `state:${this.state}`, 
                    result.stack);
            } else {
                logger.info(`Task-${this.name}.done(ok)`,
                    `dueDate:${this.dueDate && this.dueDate.toISOString()}`,
                    `state:${this.state}`);
            }
            return this;
        }

        invoke(emitter) {
            if (this.state === Scheduler.TASK_SCHEDULED) {
                this.updateDueDate();
                this.state = Scheduler.TASK_INVOKED;
                logger.info(`Task-${this.name}.invoke(${this.event_invoke})`,
                    `dueDate:${this.dueDate && this.dueDate.toISOString()}`,
                    `state:${this.state}`);
                emitter.emit(this.event_invoke, this);
            } else {
                logger.warn(`Task-${this.name}.invoke() ignored`,
                    `dueDate:${this.dueDate && this.dueDate.toISOString()}`,
                    `state:${this.state}`);
            }
        }

    }

    class Scheduler {
        constructor(opts={}) {
            this.tasks = [];
            if (opts.tasks) {
                opts.tasks.forEach(task => {
                    if (task instanceof Task) {
                        this.addTask(task);
                    } else if (typeof task === 'object') {
                        var t = new Task(task);
                        this.addTask(t);
                    } else {
                        throw new Error(`Scheduler() unrecognizable task`);
                    }
                });
            }
            this.msRefresh = opts.msRefresh || 1000;
            Object.defineProperty(this, 'emitter', {
                value: opts.emitter || new EventEmitter(),
            });
            Object.defineProperty(this, 'interval', {
                value: null,
                writable: true,
            });
            Object.defineProperty(this, "processCount", {
                writable: true,
                value: 0,
            });
        }

        isActive() {
            return !!this.interval;
        }

        run() {
            try {
                this.processTasks();
            } catch(e) {
                e = e || new Error("(unknown)");
                logger.error("Scheduler.run() processTasks error:", e.stack);
                //TODO that.interval && clearInterval(that.interval);
                //TODO logger.error("Scheduler stopped");
            }
        }

        start() {
            var that = this;
            if (that.interval == null) {
                that.interval = setInterval(() => that.run(), that.msRefresh);
            }
            return that;
        }

        stop() {
            if (this.interval != null) {
                clearInterval(this.interval);
                this.interval = null;
            }
            return this;
        }

        addTask(task) {
            if (!(task instanceof Task)) {
                throw new Error("Scheduler.addTask() expacted task");
            }
            this.tasks.push(task);
        }

        processTasks() {
            this.processCount++;
            var now = new Date();
            for (var i=0; i < this.tasks.length; i++) {
                var task = this.tasks[i];
                if (task.dueDate) {
                    if (task.dueDate <= now) {
                        task.invoke(this.emitter);
                    } else if (task.state === Scheduler.TASK_SCHEDULED) {
                        logger.debug(`Scheduler.processTasks() skipping scheduled`,
                            `task:${task.name} dueDate:${task.dueDate}`);
                    } else if (task.state === Scheduler.TASK_DONE) {
                        var err = new Error(`Scheduler.processTasks() completed task has `+
                            `dueDate:${task.dueDate} task:${task.name}`);
                        logger.error(err.stack);
                        throw err;
                    } else if (task.state === Scheduler.TASK_INVOKED) {
                        logger.debug(`Scheduler.processTasks() skipping invoked`,
                            `task:${task.name} dueDate:${task.dueDate}`);
                        throw err;
                    } else {
                        var err = new Error(`Scheduler.processTasks() invalid `+
                                `task:${task.name} state:${task.state} dueDate:${task.dueDate}`);
                        logger.error(err.stack);
                        throw err;
                    }
                } else if (task.state === Scheduler.TASK_SCHEDULED) {
                    var err = new Error(`Scheduler.processTasks() no due date for scheduled task:${task.name}`);
                    logger.error(err.staack);
                    throw err;
                } else if (task.state === Scheduler.TASK_INVOKED) {
                    logger.debug(`Scheduler.processTasks() busy`,
                        `task:${task.name} state:${task.state}`);
                } else if (task.state === Scheduler.TASK_DONE) {
                    logger.debug(`Scheduler.processTasks() skipped completed`,
                        `task:${task.name} state:${task.state}`);
                } else {
                    var err = new Error(`Scheduler.processTasks() invalid task:${task.name} state:${task.state}`);
                    logger.error(err);
                    throw err;
                }
            }
            return this;
        }

        static get Task() { return Task; }
        static get RECUR_DAILY() { return RECUR_DAILY; }
        static get RECUR_NONE() { return RECUR_NONE; }
        static get EVENT_INVOKE() { return EVENT_INVOKE; } 
        static get TASK_DONE() { return TASK_DONE; } 
        static get TASK_INVOKED() { return TASK_INVOKED; } 
        static get TASK_SCHEDULED() { return TASK_SCHEDULED; } 

        static createDueDate(hours=0, minutes=0, seconds=0, millis=0, startDate=new Date()) {
            var date = new Date(startDate);
            date.setHours(hours);
            date.setMinutes(minutes);
            date.setSeconds(seconds,millis);
            if (date.getTime() < Date.now()) {
                date.setDate(date.getDate()+1);
            }
            return date;
        }

    } // class Scheduler

    module.exports = exports.Scheduler = Scheduler;
})(typeof exports === "object" ? exports : (exports = {}));
