#!/usr/bin/env node

const path = require("path");
const express = require('express');
const app = module.exports = express();
const rb = require("../index.js");
const winston = require("winston");

// Application setup
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Access-Control-Allow-Headers");
    next();
});
app.use("/", express.static(path.join(__dirname, "../src/ui")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

// argv might be for script or for mocha, so we have to check
var argv = process.argv[1].match(__filename) && process.argv || []; 

// create RestBundles
var restBundles = app.locals.restBundles = [];
argv.forEach((a, i) => {
    var rbName = i>1 && a[0]!=='-' && a!=='test' && a;
    rbName && restBundles.push(new rb.RestBundle(rbName));
});
restBundles.push(new rb.RestBundle("test")); // documentation and test

// create http server and web socket
app.locals.rbServer = new rb.RbServer().listen(app, restBundles); 
