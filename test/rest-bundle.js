const supertest = require("supertest");

(typeof describe === 'function') && describe("RestBundle", function() {
    var should = require("should");

    it("GET /hello generates HTTP200 response", function(done) {
        var app = require("../scripts/hello-node.js");
        supertest(app).get("/greeting/hello").expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/html/);
            res.headers["content-type"].should.match(/utf-8/);
            res.text.should.equal("hello");
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("GET /identity generates HTTP200 response", function(done) {
        var app = require("../scripts/hello-node.js");
        supertest(app).get("/greeting/identity").expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            res.body.should.properties({
                name: "greeting",
                type: "RestBundle",
            });
            res.body.version.should.match(/\d+.\d+.\d+/);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("POST /identity generates HTTP200 response", function(done) {
        var app = require("../scripts/hello-node.js");
        supertest(app).post("/greeting/hello").send({greeting:"smile"}).expect((res) => {
            res.statusCode.should.equal(200);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            should.deepEqual(res.body, {
                post: {
                    greeting: "smile",
                }
            });
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("POST generates HTTP500 response for thrown exception", function(done) {
        var app = require("../scripts/hello-node.js");
        supertest(app).post("/greeting/error").send({greeting:"whoa"}).expect((res) => {
            res.statusCode.should.equal(500);
            res.headers["content-type"].should.match(/json/);
            res.headers["content-type"].should.match(/utf-8/);
            should.deepEqual(res.body, {
                error: "Sadness",
            });
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("GET /ui returns index HTML", function(done) {
        var app = require("../scripts/hello-node.js");

        supertest(app).get("/greeting/ui").expect((res) => {
            res.statusCode.should.equal(302); // redirect
            res.headers["content-type"].should.match(/text/);
            res.headers["content-type"].should.match(/utf-8/);
            res.headers["location"].should.equal("/greeting/ui/index-jit");
        }).end((err,res) => {if (err) throw err; });

        supertest(app).get("/greeting/ui/index-jit").expect((res) => {
            res.statusCode.should.equal(200); 
            res.headers["content-type"].should.match(/html/);
            res.headers["content-type"].should.match(/utf-8/);
            res.text.should.match(/<html>/);
            res.text.should.match(/<index-link index="jit"/);
            res.text.should.match(/service="greeting"/); // EJS injects service name
        }).end((err,res) => {if (err) throw err; else done(); });
    })
    it("GET /ui/app returns Angular static content", function(done) {
        var app = require("../scripts/hello-node.js");

        supertest(app).get("/greeting/ui/app/main-jit.js").expect((res) => {
            res.statusCode.should.equal(200); // redirect
            res.headers["content-type"].should.match(/application\/javascript/);
            res.text.should.match(/bootstrapModule/);
        }).end((err,res) => {if (err) throw err; else done(); });
    })
})
