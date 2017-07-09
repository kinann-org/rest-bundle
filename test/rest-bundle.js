const supertest = require("supertest");

(typeof describe === 'function') && describe("RestBundle", function() {
    const should = require("should");
    const winston = require("winston");
    const pkg = require("../package.json");
    const RestBundle = require("../index.js").RestBundle;
    const express = require("express");
    const WebSocket = require("ws");
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
        var app = require("../scripts/server.js");
        winston.level = "warn"; // ignore POST warning
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
    it("Last TEST closes test suite for watch", function() {
        var app = require("../scripts/server.js");
        app.locals.rbServer.close();
    });
})
