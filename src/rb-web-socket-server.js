(function(exports) {
    const winston = require("winston");
    const WebSocket = require("ws");

    class RbWebSocketServer {

        constructor(restBundles, listener, options = {}) {
            if (!listener) {
                throw new Error("RbWebSocketServer(restBundle,listener,options) listener is required");
            }
            if (!listener.listening) {
                throw new Error("RbWebSocketServer requires an active listener");
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
            winston.info("RbWebSocketServer listening on port:", port);
            this.wss.on('connection', (ws, req) => {
                const ip = req.connection.remoteAddress;
                this.sockets.add(ws);
                winston.debug("WebSocket connected client:", ip);
                ws.on('close', () => {
                    this.sockets.delete(ws);
                    winston.debug('WebSocket disconnected client:', ip);
                });
                ws.on('error', (e) => {
                    winston.error(this.constructor.name, e);
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
                        winston.debug("RbWebSocketServer pushStateMillis:", this.pushStateMillis);
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

        getAllState() {
            return this.restBundles.reduce((acc, rb) => {
                return Object.assign(acc, {
                    [rb.name]: rb.getState(),
                });
            }, {});
        }

        pushState() {
            return new Promise((resolve, reject) => {
                this.pushCount++;
                var allState = this.getAllState();
                delete allState['web-socket'].pushCount;
                var allStateStr = JSON.stringify(allState);
                if (this.allStateStr != allStateStr) {
                    var pushedData = JSON.stringify(this.getAllState());
                    this.allStateStr = allStateStr;
                } else {
                    var pushedData = JSON.stringify(this.getState());
                }
                this.pushData("state", pushedData);
            });
        }

    } // class RbWebSocketServer

    module.exports = exports.RbWebSocketServer = RbWebSocketServer;
})(typeof exports === "object" ? exports : (exports = {}));
