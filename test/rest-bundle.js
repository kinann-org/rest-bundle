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
})
