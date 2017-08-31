const supertest = require("supertest");

(typeof describe === 'function') && describe("RestBundle", function() {
    const should = require("should");
    const winston = require("winston");
    const pkg = require("../package.json");
    const RestBundle = require("../index.js").RestBundle;
    const express = require("express");
    const WebSocket = require("ws");
    const fs = require('fs');
    const path = require('path');
    const RbHash = require('../src/rb-hash');
    winston.level = "warn";
    function testRb(app) {
        return app.locals.restBundles.filter(rb => rb.name === 'test')[0];
    }

    it("RestBundle can be extended", function(done) {
        class TestBundle extends RestBundle {
            constructor(name, options={}) {
                super(name, options);
                Object.defineProperty(this, "handlers", {
                    value: super.handlers.concat([
                        this.resourceMethod("get", "color", this.getColor),
                    ]),
                });
            }
            getColor(req, res, next) { return { color: "blue", }; }
        }
        var app = express();
        var tb = new TestBundle("extended").bindExpress(app);
        supertest(app).get("/extended/color").expect((res) => {
            res.statusCode.should.equal(200);
            should.deepEqual(res.body, {
                color: "blue",
            });
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("RestBundle resources should be unique", function() {
        class TestBundle extends RestBundle {
            constructor(name, options={}) {
                super(name, options);
                Object.defineProperty(this, "handlers", {
                    value: super.handlers.concat([
                        this.resourceMethod("get", "state", this.getState), // duplicate
                    ]),
                });
            }
        }
        var tb = new TestBundle("test");
        var app = express();
        should.throws(() => tb.bindExpress(app));
    })
    it("RestBundle returns 500 for bad responses", function(done) {
        winston.warn("The following warning is expected");
        class TestBundle extends RestBundle {
            constructor(name, options={}) {
                super(name, options);
                Object.defineProperty(this, "handlers", {
                    value: super.handlers.concat([
                        this.resourceMethod("get", "bad-json", this.getBadJson),
                    ]),
                });
            }
            getBadJson(req, res, next) { 
                var badJson = {
                    name: "circular",
                }
                badJson.self = badJson;
                return badJson;
            }
        }
        var app = express();
        var tb = new TestBundle("extended").bindExpress(app);
        supertest(app).get("/extended/bad-json").expect((res) => {
            res.statusCode.should.equal(500);
            should.deepEqual(res.body, {
                error: "Converting circular structure to JSON",
            });
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("GET /state returns RestBundle singleton state", function(done) {
        var app = require("../scripts/server.js");
        supertest(app).get("/test/state").expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("GET /identity generates HTTP200 response", function(done) {
        var app = require("../scripts/server.js");
        supertest(app).get("/test/identity").expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            res.body.should.properties({
                name: "test",
                package: pkg.name,
            });
            res.body.version.should.match(/\d+.\d+.\d+/);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("POST /echo generates HTTP200 response with a Promise", function(done) {
        var app = require("../scripts/server.js");
        var service = testRb(app);
        service.taskBag.length.should.equal(0);
        service.taskBegin("testTask");
        service.taskBag.length.should.equal(1);
        supertest(app).post("/test/echo").send({greeting:"smile"}).expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            should.deepEqual(res.body, {
                 greeting: "smile",
            });
            service.taskBag.length.should.equal(1);
            service.taskBag[0].should.equal("testTask");
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("POST generates HTTP500 response for thrown exception", function(done) {
        winston.warn("The following warning is expected");
        var app = require("../scripts/server.js");
        supertest(app).post("/test/identity").send({greeting:"whoa"}).expect((res) => {
            res.statusCode.should.equal(500);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            res.body.should.properties(["error"]);
            res.body.error.should.match(/POST not supported/);
            res.body.error.should.match(/{"greeting":"whoa"}/);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("GET /ui redirects to service HTML", function(done) {
        var app = require("../scripts/server.js");

        supertest(app).get("/test/ui").expect((res) => {
            res.statusCode.should.equal(302); // redirect
            res.headers["content-type"].should.match(/text/);
            res.headers["content-type"].should.match(/utf-8/);
            res.headers["location"].should.equal("/test/ui/index-service");
            done();
        }).end((err,res) => {if (err) throw err; });
    })
    it("GET /ui/index-service returns service HTML", function(done) {
        var app = require("../scripts/server.js");

        supertest(app).get("/test/ui/index-service").expect((res) => {
            res.statusCode.should.equal(200); 
            res.headers["content-type"].should.match(/text\/html/);
            res.text.should.match(/<title>test<\/title>/);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("toKebabCase(id) does that", function() {
        var kebab = (id) => id.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/,'');
        kebab("XFooBar").should.equal("x-foo-bar");
        kebab("xFooBar").should.equal("x-foo-bar");
        kebab("abc").should.equal("abc");
        kebab("aBC").should.equal("a-b-c");
    });
    it("apiModelPath() returns RestBundle api model path", function() {
        var rb = new RestBundle('Binky');
        var amp = rb.apiModelPath();
        should.strictEqual(amp.endsWith('/api-model/Binky.json'), true);
        var amp = rb.apiModelPath("MyRestBundle");
        should.strictEqual(amp.endsWith('/api-model/MyRestBundle.json'), true);
    });
    it("loadApiModel() returns RestBundle apiModel Promise", function(done) {
        let async = function*() {
            try {
                var rb = new RestBundle('Binky');
                var result = yield rb.loadApiModel("NoApiModel")
                    .then(r=> async.next(r)).catch(e=> async.throw(e));
                should.equal(result, null);
                done();
            } catch (err) {
                should.fail(err);
            }
        }();
        async.next();
    });
    it("saveApiModel(apiModel) saves RestBundle api model", function(done) {
        let async = function*() {
            var rb = new RestBundle('Binky');
            var apiModel = {
                color: 'purple',
            }
            var result = yield rb.saveApiModel(apiModel).then(r=>async.next(r)).catch(e=>async.throw(e));
            should.strictEqual(result, apiModel);
            var result = yield rb.loadApiModel().then(r=>async.next(r)).catch(e=>async.throw(e));
            should.deepEqual(result, apiModel);
            done();
        }();
        async.next();
    });
    it("putApiModel updates and saves api model", function(done) {
        var async = function*() {
            try {
                const rbh = new RbHash();
                var rb = new RestBundle('Binky');
                var fileName = "test-putApiModel";
                var filePath = path.join(__dirname, '..', 'api-model', fileName+'.json');
                fs.existsSync(filePath) && fs.unlinkSync(filePath);

                // initialize api model
                var blankModel = {
                    rbHash: rbh.hash({}),
                }
                var req = {
                    body: { 
                        apiModel: {
                            color: 'purple',
                            size: 'large',
                            rbHash: blankModel.rbHash,
                        },
                    },
                }
                var res = {
                    locals: {},
                };
                var next = function () {};
                var result = yield rb.putApiModel(req, res, next, fileName)
                    .then(r=>async.next(r)).catch(e=>async.throw(e));
                var purpleHash = rbh.hash({
                    color: 'purple',
                    size: 'large',
                });
                should.deepEqual(result.apiModel, {
                    color: 'purple',
                    size: 'large',
                    rbHash: purpleHash,
                });

                // change one field of api model
                var req = {
                    body: { 
                        apiModel: {
                            color: 'red',
                            rbHash: purpleHash,
                        },
                    },
                }
                var res = {
                    locals: {},
                };
                var result = yield rb.putApiModel(req, res, next, fileName)
                    .then(r=>async.next(r)).catch(e=>async.throw(e));
                var redHash = rbh.hash({
                    color: 'red',
                    size: 'large',
                });
                should.deepEqual(result.apiModel, {
                    color: 'red',
                    size: 'large',
                    rbHash: redHash,
                });

                done();
            } catch (err) {
                winston.error(err.stack);
                done(err);
            }
        }();
        async.next();
    });
    it("Last TEST closes test suite for watch", function() {
        var app = require("../scripts/server.js");
        app.locals.rbServer.close();
    });
})
