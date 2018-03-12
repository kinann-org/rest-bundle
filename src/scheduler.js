(function(exports) {
    const EventEmitter = require('events');
    const winston = require('winston');
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
        }

        static recurDate(msRecur, dueDate=new Date()) {
            if (msRecur > 36000*1000) {
                var msDay = 24*3600*1000;
                var dateRecur = msRecur / msDay;
                var date =  new Date(dueDate);
                date.setDate(date.getDate()+dateRecur); // allow for DST
                return date;
            }
            return new Date(dueDate.getTime() + msRecur);
        }

        done(result) {
            this.result = result;
            this.lastDone = new Date();
            if (result instanceof Error) {
                winston.warn(`Task-${this.name}.done(Error)`, result.stack);
            } else {
                winston.info(`Task-${this.name}.done(ok)`);
            }
            if (this.msRecur === RECUR_NONE) {
                this.dueDate = null;
                this.state = Scheduler.TASK_DONE;
            } else {
                this.state = Scheduler.TASK_SCHEDULED;
                if (this.dueDate) {
                    var msRecur = this.msRecur;
                    var dueDate = this.dueDate;
                    this.dueDate = Task.recurDate(msRecur, dueDate);
                }
            }
            return this;
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
        }

        isActive() {
            return !!this.interval;
        }

        start() {
            if (this.interval == null) {
                this.interval = setInterval(() => this.processTasks(), this.msRefresh);
            }
            return this;
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
            var now = new Date();
            for (var i=0; i < this.tasks.length; i++) {
                var task = this.tasks[i];
                if (task.dueDate) {
                    if (task.dueDate <= now) {
                        if (task.state === Scheduler.TASK_SCHEDULED) {
                            task.state = Scheduler.TASK_INVOKED;
                            winston.info(`Scheduler.processTasks() task:${task.name} event:${task.event_invoke}`);
                            this.emitter.emit(task.event_invoke, task);
                        } else {
                            winston.info(`Scheduler.processTasks() ignored`,
                                `task:${task.name} state:${task.state} dueDate:${task.dueDate}`);
                        }
                    } else if (task.state === Scheduler.TASK_SCHEDULED) {
                        winston.debug(`Scheduler.processTasks() skipping scheduled`,
                            `task:${task.name} dueDate:${task.dueDate}`);
                    } else if (task.state === Scheduler.TASK_DONE) {
                        var err = new Error(`Scheduler.processTasks() due date for completed task:${task.name}`);
                        winston.error(err.staack);
                        throw err;
                    } else if (task.state === Scheduler.TASK_INVOKED) {
                        winston.debug(`Scheduler.processTasks() skipping invoked`,
                            `task:${task.name} dueDate:${task.dueDate}`);
                        throw err;
                    } else {
                        var err = new Error(`Scheduler.processTasks() invalid `+
                                `task:${task.name} state:${task.state} dueDate:${task.dueDate}`);
                        winston.error(err.stack);
                        throw err;
                    }
                } else if (task.state === Scheduler.TASK_SCHEDULED) {
                    var err = new Error(`Scheduler.processTasks() no due date for scheduled task:${task.name}`);
                    winston.error(err.staack);
                    throw err;
                } else if (task.state === Scheduler.TASK_INVOKED) {
                    winston.info(`Scheduler.processTasks() busy`,
                        `task:${task.name} state:${task.state}`);
                } else if (task.state === Scheduler.TASK_DONE) {
                    winston.debug(`Scheduler.processTasks() skipped completed`,
                        `task:${task.name} state:${task.state}`);
                } else {
                    var err = new Error(`Scheduler.processTasks() invalid task:${task.name} state:${task.state}`);
                    winston.error(err);
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

        static dueDate(hours=0, minutes=0, seconds=0, millis=0, startDate=new Date()) {
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
