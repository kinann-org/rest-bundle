#!/usr/bin/env node

const path = require("path");
const express = require('express');
const app = module.exports = express();

app.get("/demo/ui", (req,res) => {
    res.redirect("/demo/ui/pub/index.html");
});
app.use("/demo/ui", express.static(path.join(__dirname, "../src/ui")));

// bind in HelloRest service
const HelloRest = require("../test/hello-rest");
var helloRest = new HelloRest("greeting");
helloRest.bindExpress(app);
var alohaRest = new HelloRest("aloha");
alohaRest.bindExpress(app);

if (module.parent) {
    console.log("TEST\t: launched server for testing");
    app.restService = helloRest; 
} else {
    // Launch nodejs server
    const onListen = (port, data) => console.log("HTTP\t:" + ' listening on HTTP port ' + port);
    var listener = app.listen(80, (data) => onListen(80, data));
    listener.on('error', function(error) {
        if (error.code !== "EACCES") {
            throw error;
        }
        listener = app.listen(8080, (data) => onListen(8080, data));
    });
}
