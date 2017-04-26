#!/usr/bin/env node

const path = require("path");
const express = require('express');
const app = express();

app.use("/demo", express.static(path.join(__dirname, "../demo")));

// bind in HelloRest service
const HelloRest = require("../src/hello-rest");
var helloRest = new HelloRest("greeting");
helloRest.bindExpress(app);

// Launch nodejs server
const onListen = (port, data) => console.log("HTTP\t:" + ' listening on HTTP port ' + port);
var listener = app.listen(80, (data) => onListen(80, data));
listener.on('error', function(error) {
    if (error.code !== "EACCES") {
        throw error;
    }
    listener = app.listen(8080, (data) => onListen(8080, data));
});

