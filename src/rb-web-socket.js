(function(exports) {
    const winston = require("winston");
    const WebSocket = require("ws");

    class RbWebSocket {

        constructor(restBundles, listener, options = {}) {
            if (!listener) {
                throw new Error("RbWebSocket(restBundle,listener,options) listener is required");
            }
            this.restBundles = restBundles;
            this.restBundles.forEach(rb => {
                var that = this;
                rb.pushState = function() {
                    winston.debug("direct pushState");
                    return that.pushState();
                }
            });
            this.listener = listener;
            this.wss = new WebSocket.Server({
                server: listener
            });
            this.sockets = new Set();
            var port = listener.address().port;
            winston.info("WebSocket listening on port:", port);
            this.wss.on('connection', (ws, req) => {
                const ip = req.connection.remoteAddress;
                this.sockets.add(ws);
                winston.debug("WebSocket connected client:", ip);
                ws.on('close', () => {
                    this.sockets.delete(ws);
                    winston.debug('WebSocket disconnected client:', ip);
                });
            });
            var pushStateInterval = options.pushStateInterval == null ? 1000 : options.pushStateInterval;
            pushStateInterval && setInterval(() => {
                winston.debug("interval pushState");
                this.pushState();
            }, pushStateInterval);
        }

        pushData(type, data) {
            data = typeof data === 'string' ? JSON.parse(data) : data;
            var message = JSON.stringify({
                type,
                data
            });
            winston.debug("pushing ", message);
            this.sockets.forEach((ws) => ws.send(message));
        }

        pushState() {
            return new Promise((resolve, reject) => {
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
            });
        }

    } // class RbWebSocket

    module.exports = exports.RbWebSocket = RbWebSocket;
})(typeof exports === "object" ? exports : (exports = {}));