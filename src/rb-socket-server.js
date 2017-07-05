(function(exports) {
    const winston = require("winston");
    const WebSocket = require("ws");

    class RbSocketServer {

        constructor(restBundles, listener, options = {}) {
            if (!listener) {
                throw new Error("RbSocketServer(restBundle,listener,options) listener is required");
            }
            if (!listener.listening) {
                throw new Error("RbSocketServer requires an active listener");
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
            winston.info("RbSocketServer listening on port:", port);
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

        close() {
            winston.debug(this.constructor.name, "close()...");
            clearInterval(this.pushStateId);
            this.wss.close();
            winston.info(this.constructor.name, "close()");
        }

        pushData(type, data) {
            data = typeof data === 'string' ? JSON.parse(data) : data;
            var message = JSON.stringify({
                type,
                data
            });
            this.pushCount++;
            winston.debug("push", this.pushCount,  message);
            this.sockets.forEach((ws) => ws.send(message));
        }

        getModel() {
            var model = this.getState()['web-socket'];
            return {
                pushStateMillis: this.pushStateMillis,
            };
        }

        setModel(model) {
            if (model.pushStateMillis) {
                if ((this.pushStateMillis = model.pushStateMillis)) {
                    if (this.pushStateId != null) {
                        clearInterval(this.pushStateId);
                    }
                    this.pushStateId = setInterval(() => {
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
                try {
                    this.pushData("state", this.getAllState());
                } catch (err) {
                    winston.error(err);
                    reject(err);
                }
            });
        }

    } // class RbSocketServer

    module.exports = exports.RbSocketServer = RbSocketServer;
})(typeof exports === "object" ? exports : (exports = {}));
