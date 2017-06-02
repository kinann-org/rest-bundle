#!/usr/bin/env node

const path = require("path");
const express = require('express');
const app = module.exports = express();
const rb = require("../index.js");
const winston = require("winston");

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use("/", express.static(path.join(__dirname, "../src/ui")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

var services = ["test"]; // for developer app, we always want a test service
process.argv[1].match(__filename) && process.argv.forEach((val, index) => {
    (index > 1 && val[0] !== '-' && val !== "test") && services.push(val);
});
winston.info("creating RestBundles:", services.join(", "));
var restBundles = services.map((name) => new rb.RestBundle(name).bindExpress(app))

if (module.parent) {
    app.restService = restBundles[0];  // supertest
} else {
    var ports = [80, 8080];
    var listener = ports.reduce( (listener, port) => {
        return listener.listening && listener
        || app.listen(port).on('error', function(error) {
            if (error.code !== "EACCES") { throw error; }
        })
    }, {});
    winston.info('Node.js http.Server listening on port:', listener.address().port);
    var rbws = new rb.RestBundle.RbWebSocket(restBundles, listener);
}
