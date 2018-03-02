(typeof describe === 'function') && describe("Scheduler", function() {
    const should = require("should");
    const EventEmitter = require('events');
    const winston = require('winston');
    const fs = require('fs');
    const path = require('path');
    const {
        Scheduler,
    } = require('../index');
    const Task = Scheduler.Task;

    it("Scheduler(opts) creates scheduler", function() {
        var sched = new Scheduler();
        should(sched).properties({
            msRefresh: 1000,
            tasks: [],
        });
    });
    it("Task(opts) creates schedule task", function(done) {
        var sched = new Scheduler();
        const Task = Scheduler.Task;

        // tasks have names
        var task1 = new Task();
        should(task1.name).instanceOf(String);
        var task2 = new Task();
        should(task2.name).not.equal(task1.name);
        var task3 = new Task({
            name: 'work',
        });
        should(task3.name).equal('work');

        // tasks can have client data
        var taskClient = new Task({
            data: {
                color: 'red',
            },
        });
        should.deepEqual(taskClient.data, {
            color: 'red',
        });

        done();
    });
    it("addTask() adds a new task", function(done) {
        var sched = new Scheduler();
        var task1 = new Scheduler.Task({
            name: 'task1',
        });
        var task2 = new Scheduler.Task({
            name: 'task2',
        });
        should(sched.tasks.length).equal(0);
        sched.addTask(task1);
        should(sched.tasks.length).equal(1);
        should(sched.tasks[0]).equal(task1);
        sched.addTask(task2);
        should(sched.tasks.length).equal(2);
        should(sched.tasks[1]).equal(task2);
        done();
    });
    it("start() starts scheduler", function(done) {
        var sched = new Scheduler();
        should(sched.interval).equal(null);
        should(sched.start()).equal(sched);
        should(sched.interval).not.equal(null);
        should(sched.stop()).equal(sched);
        should(sched.interval).equal(null);
        done();
    });
    it("done(result) marks task as done for given date", function(done) {
        var async = function*() {
            try {
                var now = new Date();
                yield setTimeout(()=>async.next(), 100); // force clock tick
                var sched = new Scheduler();
                var task = new Task();
                should(task.lastDone).equal(null);
                should(task.state).equal(Scheduler.TASK_SCHEDULED);
                should(task.done('hello')).equal(task);
                should(task.result).equal('hello');
                should(task.state).equal(Scheduler.TASK_DONE);
                should(task.lastDone).instanceOf(Date);
                should(task.lastDone).above(now);

                // recurring tasks are never done
                var task = new Task({
                    msRecur: Scheduler.RECUR_DAILY,
                });
                should(task.lastDone).equal(null);
                should(task.state).equal(Scheduler.TASK_SCHEDULED);
                task.state = Scheduler.TASK_INVOKED;
                should(task.state).equal(Scheduler.TASK_INVOKED);
                var err = new Error('badness');
                should(task.done(err)).equal(task);
                should(task.result).equal(err);
                should(task.state).equal(Scheduler.TASK_SCHEDULED);
                should(task.lastDone).instanceOf(Date);
                should(task.lastDone).above(now);

                done();
            } catch (e) {
                done(e);
            }
        }();
        async.next();
    });
    it("scheduler emits task invocation event", function(done){
        var async = function*(){
            try {
                var msRefresh = 100;
                var sched = new Scheduler({
                    msRefresh,
                });
                var task1 = new Scheduler.Task({
                    name: 'test_scheduler_task1',
                });
                var task2 = new Scheduler.Task({
                    name: 'test_scheduler_task2',
                    msRecur: msRefresh,
                });
                sched.addTask(task1);
                sched.addTask(task2);
                should(sched.msRefresh).equal(msRefresh);
                var emitter = sched.emitter;
                should(emitter).instanceOf(EventEmitter);
                var invoked = 0;
                emitter.on(Scheduler.EVENT_INVOKE, task => {
                    invoked++;
                    should(task).instanceOf(Task);
                    should(task.state).equal(Scheduler.TASK_INVOKED);
                    task.done();
                    should(task.state).not.equal(Scheduler.TASK_INVOKED);
                });

                var dueDate2 = task2.dueDate;
                sched.start();

                // first task iteration invokes both tasks
                yield setTimeout(() => async.next(),msRefresh);
                should(invoked).equal(2);
                should(task1.state).equal(Scheduler.TASK_DONE);
                should(task2.state).equal(Scheduler.TASK_SCHEDULED);
                should(task1.dueDate).equal(null);
                should(task2.dueDate.getTime()).equal(dueDate2.getTime() + msRefresh);

                // second task iteration invokes only task2
                yield setTimeout(() => async.next(),msRefresh);
                should(invoked).equal(3);
                should(task1.state).equal(Scheduler.TASK_DONE);
                should(task2.state).equal(Scheduler.TASK_SCHEDULED);
                should(task1.dueDate).equal(null);
                should(task2.dueDate.getTime()).equal(dueDate2.getTime() + 2*msRefresh);

                sched.stop();
                done();
            } catch(e) {
                done(e);
            }
        }();
        async.next();
    });
    it("Scheduler is serializable", function(done){
        var async = function*(){
            try {
                var msRefresh = 100;
                var sched0 = new Scheduler({
                    msRefresh,
                });
                sched0.addTask(new Task({
                    name: 'test_scheduler_task1',
                    data: {
                        color: 'red',
                    },
                }));
                sched0.addTask(new Scheduler.Task({
                    name: 'test_scheduler_task2',
                    msRecur: msRefresh,
                }));
                var json = JSON.stringify(sched0);

                var sched = new Scheduler(JSON.parse(json));
                var task1 = sched.tasks[0];
                var task2 = sched.tasks[1];
                should.deepEqual(task1.data, sched0.tasks[0].data);

                should(sched.msRefresh).equal(msRefresh);
                var emitter = sched.emitter;
                should(emitter).instanceOf(EventEmitter);
                var invoked = 0;
                emitter.on(Scheduler.EVENT_INVOKE, task => {
                    invoked++;
                    should(task).instanceOf(Task);
                    should(task.state).equal(Scheduler.TASK_INVOKED);
                    task.done();
                    should(task.state).not.equal(Scheduler.TASK_INVOKED);
                });

                var dueDate2 = task2.dueDate;
                sched.start();

                // first task iteration invokes both tasks
                yield setTimeout(() => async.next(),msRefresh);
                should(invoked).equal(2);
                should(task1.state).equal(Scheduler.TASK_DONE);
                should(task2.state).equal(Scheduler.TASK_SCHEDULED);
                should(task1.dueDate).equal(null);
                should(task2.dueDate.getTime()).equal(dueDate2.getTime() + msRefresh);

                // second task iteration invokes only task2
                yield setTimeout(() => async.next(),msRefresh);
                should(invoked).equal(3);
                should(task1.state).equal(Scheduler.TASK_DONE);
                should(task2.state).equal(Scheduler.TASK_SCHEDULED);
                should(task1.dueDate).equal(null);
                should(task2.dueDate.getTime()).equal(dueDate2.getTime() + 2*msRefresh);

                sched.stop();
                done();
            } catch(e) {
                done(e);
            }
        }();
        async.next();
    });
})
