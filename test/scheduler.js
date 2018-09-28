(typeof describe === 'function') && describe("Scheduler", function() {
    const should = require("should");
    const EventEmitter = require('events');
    const fs = require('fs');
    const path = require('path');
    const {
        logger,
        Scheduler,
    } = require('../index');
    const Task = Scheduler.Task;
    logger.level='warn';

    it("Scheduler(opts) creates scheduler", function() {
        var sched = new Scheduler();
        should(sched).properties({
            msRefresh: 1000,
            tasks: [],
        });
    });
    it("recurDate(msRecur,dueDate returns next due date", function() {
        var msDay = 24*3600*1000;
        var days = 2;
        var msRecur = days*msDay;

        // By default, return recurrence date immediately following the due date
        var dueDate = new Date(2018,2,12,0,30);
        var expectedDate = new Date(dueDate);
        expectedDate.setDate(dueDate.getDate()+days);
        var recurDate = Task.recurDate(msRecur,dueDate);
        should.deepEqual(recurDate, expectedDate);
        should(recurDate.getHours()).equal(dueDate.getHours());
        should((recurDate-dueDate)/(3600*1000)).equal(days*24); // normal day

        // Daylight Savings Time
        var dueDate = new Date(2018,2,11,0,30); // DST starts at 2AM March 11, 2018
        var expectedDate = new Date(dueDate);
        var hourDST = 1; // DST loses an hour
        expectedDate.setDate(dueDate.getDate()+days);
        var recurDate = Task.recurDate(msRecur,dueDate);
        should.deepEqual(recurDate, expectedDate);
        should(recurDate.getHours()).equal(dueDate.getHours());
        should((recurDate-dueDate)/(3600*1000)).equal(days*24-hourDST); // short day

        // specify recurrence date lower bound (exclusive)
        var dueDate = new Date(2018,2,12,0,30);
        var periods = 5.9; 
        var expectedPeriods = Math.ceil(periods); // integer multiple of msRecur
        var expectedDate = new Date(dueDate.getTime()+expectedPeriods*msRecur);
        var afterDate = new Date(dueDate.getTime() + msRecur*periods);
        var recurDate = Task.recurDate(msRecur,dueDate,afterDate);
        should.deepEqual(recurDate, expectedDate); 
        var recurDate = Task.recurDate(msRecur,recurDate,afterDate); // recurrence date is stable
        should.deepEqual(recurDate, expectedDate);

    });
    it("dueDate(h,m,s,ms) returns nearest due date", function() {
        var now = new Date();

        // time before now
        var dueDate = Scheduler.createDueDate(now.getHours(), now.getMinutes(), now.getSeconds()-1);
        should(dueDate.getTime()-now.getTime()).below(24*3600*1000);
        should(dueDate.getTime()-now.getTime()).above(24*3598*1000);
        should(dueDate.getMilliseconds()).equal(0);

        // time after now
        var dueDate = Scheduler.createDueDate(now.getHours(), now.getMinutes(), now.getSeconds()+1);
        should(dueDate).above(now);
        should(dueDate.getTime()-now.getTime()).below(1001);
        should(dueDate.getMilliseconds()).equal(0);

        var date = new Date(2018,2,11,0,30);
        var dueDate = Scheduler.createDueDate(0,30,0,0,date);
        should.deepEqual(dueDate, new Date(2018,2,12,0,30,0,0));

        var date = new Date(2018,2,11,1,30);
        var dueDate = Scheduler.createDueDate(0,30,0,0,date);
        should.deepEqual(dueDate, new Date(2018,2,12,0,30,0,0));

        var date = new Date(2018,2,11,2,30);
        var dueDate = Scheduler.createDueDate(0,30,0,0,date);
        should.deepEqual(dueDate, new Date(2018,2,12,0,30,0,0));

        var date = new Date(2018,2,11,23,30);
        var dueDate = Scheduler.createDueDate(0,30,0,0,date);
        should.deepEqual(dueDate, new Date(2018,2,12,0,30,0,0));

        var date = new Date(2018,2,11,0,30);
        var dueDate = Scheduler.createDueDate(23,30,0,0,date);
        should.deepEqual(dueDate, new Date(2018,2,12,23,30,0,0));

        var date = new Date(2018,2,11,23,30);
        var dueDate = Scheduler.createDueDate(23,30,0,0,date);
        should.deepEqual(dueDate, new Date(2018,2,12,23,30,0,0));
    });
    it("Task(opts) creates schedule task", function(done) {
        var sched = new Scheduler();
        const Task = Scheduler.Task;

        // tasks have names
        var task1 = new Task();
        should(task1.name).instanceOf(String);
        should(task1.dueDate.getTime()).approximately(Date.now(), 100);
        should(task1).properties({
            state: Scheduler.TASK_SCHEDULED,
            data: {},
            event_invoke: Scheduler.EVENT_INVOKE,
            msRecur: Scheduler.RECUR_NONE,
            lastDone: null,
        });
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

        var dueDate = new Date(2018, 1, 2);
        var task = new Task({
            dueDate,
        });
        should(task).properties({
            dueDate,
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
        should(sched.isActive()).equal(false);

        should(sched.start()).equal(sched);
        should(sched.interval).not.equal(null);
        should(sched.isActive()).equal(true);

        should(sched.stop()).equal(sched);
        should(sched.interval).equal(null);
        should(sched.isActive()).equal(false);
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
                logger.warn(`Expected error (BEGIN)`);
                var err = new Error('badness');
                should(task.done(err)).equal(task);
                logger.warn(`Expected error (END)`);
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
                should(sched.processCount).equal(0);
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

                var dueDate2 = new Date(task2.dueDate);
                sched.start();

                // first task iteration invokes both tasks
                yield setTimeout(() => async.next(),msRefresh);
                should(sched.processCount).equal(1);
                should(invoked).equal(2);
                should(task1.state).equal(Scheduler.TASK_DONE);
                should(task2.state).equal(Scheduler.TASK_SCHEDULED);
                should(task1.dueDate).equal(null);
                should(task2.dueDate.getTime()).equal(dueDate2.getTime() + msRefresh);

                // second task iteration invokes only task2
                yield setTimeout(() => async.next(),msRefresh);
                should(sched.processCount).equal(2);
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
    it("processTasks() invokes scheduled events", function(done) {
        var sched = new Scheduler();
        var now = new Date();
        var msRecur = 100;
        var invokedTasks = [];
        var name1 = 'test_processTask1';
        var dueDate1 = new Date(Date.now()-msRecur);
        var name2 = 'test_processTask2';
        var dueDate2 = new Date(Date.now()+msRecur);
        sched.emitter.on(Scheduler.EVENT_INVOKE, task => {
            invokedTasks.push(task);
        });
        sched.addTask(new Task({
            name: name1,
            msRecur,
            dueDate: dueDate1,
        }));
        sched.addTask(new Task({
            name: name2,
            msRecur,
            dueDate: dueDate2,
        }));
        should(sched.tasks[0]).properties({
            name: name1,
            state: Scheduler.TASK_SCHEDULED,
            dueDate: dueDate1,
        });
        should(sched.tasks[1]).properties({
            name: name2,
            state: Scheduler.TASK_SCHEDULED,
            dueDate: dueDate2,
        });

        // processTasks() is normally called by scheduler
        should(sched.processTasks()).equal(sched);
        should(invokedTasks.length).equal(1);
        should(invokedTasks[0]).equal(sched.tasks[0]);
        should(sched.tasks[0]).properties({
            name: name1,
            state: Scheduler.TASK_INVOKED,
            dueDate: new Date(dueDate1.getTime()+msRecur),
        });
        should(sched.tasks[1]).properties({
            name: name2,
            state: Scheduler.TASK_SCHEDULED,
            dueDate: dueDate2,
        });

        // task completed and state reverts invoked->scheduled
        invokedTasks[0].done('happy');
        should(invokedTasks.length).equal(1);
        should(sched.tasks[0]).properties({
            name: name1,
            state: Scheduler.TASK_SCHEDULED,
            result: 'happy',
        });
        should(sched.tasks[0].dueDate.getTime()).approximately(dueDate1.getTime()+msRecur, 1);

        done();
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
