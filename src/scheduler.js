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
            this.name = opts.name || `Task_${(Math.round(Math.random()*0x100000)).toString(16)}`;
            this.msRecur = opts.msRecur || RECUR_NONE;
            this.dueDate = opts.dueDate && new Date(opts.dueDate) || new Date();
            this.state = opts.state || TASK_SCHEDULED;
            this.event_invoke = opts.event_invoke || EVENT_INVOKE;
            this.data = opts.data || {};
        }


        done(result) {
            this.result = result;
            this.lastDone = new Date();
            if (this.msRecur === RECUR_NONE) {
                this.dueDate = null;
                this.state = Scheduler.TASK_DONE;
            } else {
                this.state = Scheduler.TASK_SCHEDULED;
                if (this.dueDate) {
                    this.dueDate = new Date(this.dueDate.getTime() + this.msRecur);
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

        start() {
            if (this.interval == null) {
                this.interval = setInterval(() => this.onRefresh(), this.msRefresh);
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

        onRefresh() {
            var now = new Date();
            for (var i=0; i < this.tasks.length; i++) {
                var task = this.tasks[i];
                if (task.state === Scheduler.TASK_SCHEDULED) {
                    if (task.dueDate < now) {
                        task.state = Scheduler.TASK_INVOKED;
                        winston.info(`Scheduler.onRefresh() task:${task.name} event:${task.event_invoke}`);
                        this.emitter.emit(task.event_invoke, task);
                    }
                }
            }
        }

        static get Task() { return Task; }
        static get RECUR_DAILY() { return RECUR_DAILY; }
        static get RECUR_NONE() { return RECUR_NONE; }
        static get EVENT_INVOKE() { return EVENT_INVOKE; } 
        static get TASK_DONE() { return TASK_DONE; } 
        static get TASK_INVOKED() { return TASK_INVOKED; } 
        static get TASK_SCHEDULED() { return TASK_SCHEDULED; } 

        static dueDate(hours=0, minutes=0, seconds=0, millis=0) {
            var date = new Date();
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
