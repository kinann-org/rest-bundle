#!/usr/bin/env node

const path = require("path");
const express = require('express');
const app = module.exports = express();
const RestBundle = require("../src/rest-bundle");

var services = [];
process.argv.forEach((val, index) => {
    (index > 1 && val[0] !== '-') && services.push(val);
});
(services.length === 0) && services.push("test"); // default

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use("/", express.static(path.join(__dirname, "../src/ui")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

var bundles = services.map((name,index) => {
    console.log("HTTP\t: creating RestBundle(" +name+ ")");
    return new RestBundle(name).bindExpress(app);
});

if (module.parent) {
    app.restService = bundles[0]; 
} else {
    const onListen = (port, data) => console.log("HTTP\t:" + ' listening on port ' + port);
    var listener = app.listen(80, (data) => onListen(80, data));
    listener.on('error', function(error) {
        if (error.code !== "EACCES") {
            throw error;
        }
        listener = app.listen(8080, (data) => onListen(8080, data));
    });
}
