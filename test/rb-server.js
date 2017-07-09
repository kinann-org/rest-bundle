
(typeof describe === 'function') && describe("RbServer", function() {
    const supertest = require("supertest");
    const should = require("should");
    const winston = require("winston");
    const fs = require("fs");
    const pkg = require("../package.json");
    const RestBundle = require("../index.js").RestBundle;
    const express = require("express");
    const WebSocket = require("ws");
    const RbHash = require("../index.js").RbHash;
    var rbh = new RbHash();
    winston.level = "warn";
    function testRb(app) {
        return app.locals.restBundles.filter(rb => rb.name === 'test')[0];
    }

    it("GET /server/web-socket returns server singleton web socket model", function(done) {
        var app = require("../scripts/server.js");
        var path = "api-model/RbServer.web-socket.json";
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
        supertest(app).get("/RbServer/web-socket").expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            should.deepEqual(res.body, {
                apiModel: {
                    pushStateMillis: 1000,  // model property (client-mutable)
                    rbHash: '6891f21022da4de64bb6fe800831898c', // base hash
                }
            });
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("GET /server/web-socket loads web socket api model from file", function(done) {
        var async = function * () {
            try {
                var app = require("../scripts/server.js");
                var testModel = {
                    pushStateMillis: 1234,
                }
                testModel.rbHash = rbh.hash(testModel);
                if (!fs.existsSync("api-model")) {
                    yield fs.mkdir("api-model", e=>e?async.throw(e):async.next(null));
                }
                fs.writeFile("api-model/RbServer.web-socket.json", JSON.stringify(testModel));
                var res = yield supertest(app).get("/RbServer/web-socket").expect((res) => {
                    res.statusCode.should.equal(200);
                    res.headers["content-type"].should.match(/json/);
                    res.headers["content-type"].should.match(/utf-8/);
                    should.deepEqual(res.body, {
                        apiModel: {
                            pushStateMillis: 1234, 
                            rbHash: rbh.hash(res.body.apiModel),
                        }
                    });
                }).end((err,res) => {if (err) async.throw(err); else async.next(res);});
                done();
            } catch (err) {
                winston.error(err.message, err.stack);
                throw(err);
            }
        }();
        async.next();
    })
    it("TESTPUT /server/web-socket updates web socket model", function(done) {
        var async = function * () {
            try {
                var app = require("../scripts/server.js");
                var path = "api-model/RbServer.web-socket.json";
                if (fs.existsSync(path)) {
                    yield fs.unlink(path, e=>e?async.throw(e):async.next(null));
                }
                var testModel = {
                    pushStateMillis: 1000,
                }
                testModel.rbHash = rbh.hash(testModel);
                app.locals.rbServer.rbss.setModel(testModel);
                var res = yield supertest(app).get("/RbServer/web-socket").expect((res) => {
                    res.statusCode.should.equal(200);
                }).end((err,res) => {if (err) async.throw(err); else async.next(res);});
                var update = Object.assign({}, res.body);
                update.apiModel.should.properties({
                    pushStateMillis: 1000,
                    rbHash: rbh.hash(update.apiModel),
                });
                update.apiModel.pushStateMillis = 2000;
                supertest(app).put("/RbServer/web-socket").send(update).expect((res) => {
                    res.statusCode.should.equal(200);
                    res.headers["content-type"].should.match(/json/);
                    res.headers["content-type"].should.match(/utf-8/);
                    var expectedModel = {
                        pushStateMillis: 2000,  // model property (client-mutable)
                        rbHash: rbh.hash(update.apiModel),
                    }
                    should.deepEqual(res.body, {
                        apiModel: expectedModel,
                    });
                    should.ok(fs.existsSync(path));
                    var json = JSON.parse(fs.readFileSync(path));
                    should.deepEqual(json, expectedModel);
                }).end((err,res) => {if (err) throw err; else done(); });
            } catch (err) {
                winston.error(err.message, err.stack);
                throw(err);
            }
        }();
        async.next();
    })
    it("TESTPUT /server/web-socket rejects conflicting update", function(done) {
        var async = function * () {
            try {
                var app = require("../scripts/server.js");
                var res = yield supertest(app).get("/RbServer/web-socket").expect((res) => {
                    res.statusCode.should.equal(200);
                }).end((err,res) => {if (err) async.throw(err); else async.next(res);});
                var rbHash = res.body.rbHash;
                var modelCurrent = res.body;
                var conflictingUpdate = Object.assign({}, modelCurrent, {
                    apiModel: {
                        pushStateMillis: 1212,
                        rbHash: 'some-other-hash',
                    }
                }); 
                var res = yield supertest(app).put("/RbServer/web-socket").send(conflictingUpdate).expect((res) => {
                    res.statusCode.should.equal(409);
                    res.headers["content-type"].should.match(/json/);
                    res.headers["content-type"].should.match(/utf-8/);
                    res.body.error.should.match(/service data has changed/); // conflicting hash
                    res.body.error.should.match(new RegExp(modelCurrent.rbHash)); // expected hash
                    should.deepEqual(res.body.data, modelCurrent);
                }).end((err,res) => {if (err) async.throw(err); else async.next(res);});
                done();
            } catch (err) {
                winston.error(err);
                throw(err);
            }
        }();
        async.next();
    })
    it("Last TEST closes test suite for watch", function() {
        var app = require("../scripts/server.js");
        app.locals.rbServer.close();
    });
})
