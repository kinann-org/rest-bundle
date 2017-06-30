(function(exports) {
    const winston = require("winston");
    const WebSocket = require("ws");

    class RbWebSocket {

        constructor(restBundles, listener, options = {}) {
            if (!listener) {
                throw new Error("RbWebSocket(restBundle,listener,options) listener is required");
            }
            if (!listener.listening) {
                throw new Error("RbWebSocket requires an active listener");
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
            winston.info("RbWebSocket listening on port:", port);
            this.wss.on('connection', (ws, req) => {
                const ip = req.connection.remoteAddress;
                this.sockets.add(ws);
                winston.debug("WebSocket connected client:", ip);
                ws.on('close', () => {
                    this.sockets.delete(ws);
                    winston.debug('WebSocket disconnected client:', ip);
                });
            });
            this.pushCount = 0;
            this.setModel({
                pushStateMillis: options.pushStateMillis == null ? 1000 : options.pushStateMillis,
            });
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

        getModel() {
            var model = this.getState()['web-socket'];
            return Object.assign(model, {
                pushStateMillis: this.pushStateMillis,
            });
        }

        setModel(model) {
            if (model.pushStateMillis) {
                if ((this.pushStateMillis = model.pushStateMillis)) {
                    if (this.pushStateId != null) {
                        clearInterval(this.pushStateId);
                    }
                    this.pushStateId = setInterval(() => {
                        winston.debug("RbWebSocket pushStateMillis:", this.pushStateMillis);
                        this.pushState();
                    }, this.pushStateMillis);
                }
            }
        }

        getState() {
            return {
                "web-socket": {
                    pushCount: this.pushCount,
                }
            }
        }

        pushState() {
            return new Promise((resolve, reject) => {
                this.pushCount++;
                var acc = this.getState();
                var state = this.restBundles.reduce((acc, rb) => {
                    return Object.assign(acc, {
                        [rb.name]: rb.getState(),
                    });
                }, acc);
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
