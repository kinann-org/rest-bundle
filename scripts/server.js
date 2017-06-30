#!/usr/bin/env node

const path = require("path");
const express = require('express');
const app = module.exports = express();
const rb = require("../index.js");
const winston = require("winston");

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Access-Control-Allow-Headers");
    next();
});
app.use("/", express.static(path.join(__dirname, "../src/ui")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

var services = ["test"]; // for developer app, we always want a test service
process.argv[1].match(__filename) && process.argv.forEach((val, index) => {
    (index > 1 && val[0] !== '-' && val !== "test") && services.push(val);
});
var restBundles = [new rb.RbServer()].concat(services.map((name) => new rb.RestBundle(name)));
restBundles.forEach(rb => rb.bindExpress(app));

if (module.parent) { // unit tests
    app.locals.restService = restBundles[0];  // supertest
    var ports = new Array(100).fill(null).map((a,i) => 3000 + i); // lots of ports for mocha -w
} else {
    var ports = [80, 8080];
}

var listener = ports.reduce( (listener, port) => {
    return listener.listening && listener
    || app.listen(port).on('error', function(error) {
        if (error.code === "EACCES") { 
            // 80 requires root
        } else if (error.code === "EADDRINUSE" ) {
            // supertest doesn't release port
        } else { 
            throw error; 
        }
    })
}, {});
app.locals.webSocket = new rb.RbWebSocket(restBundles, listener);
