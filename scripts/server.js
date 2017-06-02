#!/usr/bin/env node

const path = require("path");
const express = require('express');
const app = module.exports = express();
const RestBundle = require("../src/rest-bundle");
const winston = require("winston");
const WebSocket = require("ws");

var services = ["test"];
process.argv[1].match(__filename) && process.argv.forEach((val, index) => {
    (index > 1 && val[0] !== '-' && val !== "test") && services.push(val);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use("/", express.static(path.join(__dirname, "../src/ui")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

var restBundles = services.map((name,index) => {
    winston.info("binding RestBundle(", name, ") to express");
    return new RestBundle(name).bindExpress(app);
});

class RbWebSocket {
    constructor(restBundles, listener) {
        this.restBundles = restBundles;
        this.listener = listener;
        this.wss = new WebSocket.Server({ server: listener });
        this.sockets = new Set();
        winston.info("WebSocket listening on port:", port);
        this.wss.on('connection', (ws, req) => {
            const ip = req.connection.remoteAddress;
            this.sockets.add(ws);
            winston.debug("WebSocket connected client:", ip);
            this.stateStr && ws.send(this.stateStr);
            ws.on('close', () => {
                this.sockets.delete(ws);
                winston.debug('WebSocket disconnected client:', ip);
            });
        });
    }
    pushData(type, data) {
        data = typeof data === 'string' ? data : JSON.stringify(data);
        var now = Date.now();
        var message = '{"timestamp":'+now+',"type":"'+type+'","data":'+data+'}';
        winston.debug("pushing ", message);
        this.sockets.forEach((ws) => {
            ws.send(message);
        });
    }
    pushState() {
        var state = this.restBundles.reduce((acc, rb) => {
            return Object.assign(acc, {
                [rb.name]: rb.getState(),
            });
        }, {});
        var stateStr = JSON.stringify(state);
        if (this.stateStr != stateStr) {
            this.pushData("state", stateStr);
            this.stateStr = stateStr;
        }
    }
}

if (module.parent) {
    app.restService = restBundles[0];  // supertest
} else {
    var ports = [80, 8080];
    var listener = ports.reduce( (listener, port) => {
        return listener && listener.listening && listener
        || app.listen(port).on('error', function(error) {
            if (error.code !== "EACCES") { throw error; }
        })
    }, null);
    if (!listener.listening) {
        throw new Error("could not launch http.Server on any port");
    }
    var port = listener.address().port;
    winston.info('Node.js http.Server listening on port:', port);
    var rbws = new RbWebSocket(restBundles, listener);
    setInterval(() => rbws.pushState(), 1000);
}
