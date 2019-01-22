#!/usr/bin/env node

const path = require("path");
const express = require('express');
const app = module.exports = express();
const {
    logger,
    RestBundle,
    RbServer,
} = require("../index.js");

// Application setup
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Access-Control-Allow-Headers");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT");
    next();
});
app.use("/", express.static(path.join(__dirname, "../src/ui")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

var async = function*() {
    try {
        // argv might be for script or for mocha, so we have to check
        var argv = process.argv[1].match(__filename) && process.argv || []; 

        // create RestBundles
        var restBundles = app.locals.restBundles = [];
        for (var i = 0; i < argv.length; i++) {
            var a = argv[i];
            var rbName = i>1 && a[0]!=='-' && a!=='test' && a;
            if (rbName) {
                var rb = new RestBundle(rbName);
                yield rb.initialize().then(r=>async.next(r)).catch(e=>async.throw(e));
                restBundles.push(rb);
            }
        }
        var rb = new RestBundle('test');
        yield rb.initialize().then(r=>async.next(r)).catch(e=>async.throw(e));
        restBundles.push(rb); // documentation and test

        // create http server and web socket
        var rbServer =  app.locals.rbServer = new RbServer();
        if (argv.some(a => a === '--ssl')) {
            rbServer.listenSSL(app, restBundles); 
        } else {
            var ports = [80, 8080].concat(new Array(100)
                .fill(3000).map((p,i)=>p+i));
            rbServer.listen(app, restBundles, ports); 
        }
        yield rbServer.initialize()
            .then(r=>async.next(r)).catch(e=>async.throw(e));
    } catch(e) {
        logger.error(e.stack);
        throw e;
    }
}();
async.next();
