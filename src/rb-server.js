/**
 * RbServer is the RestBundle for a server singleton
 * that manages shared resources such as rb-web-socket-server.
 */
(function(exports) {
    const winston = require("winston");
    const RbWebSocketServer = require("./rb-web-socket-server");
    const RestBundle = require("./rest-bundle");

    class RbServer extends RestBundle {
        constructor(name, options = {}) {
            super("RbServer", RbServer.initOptions(options));
        }
        
        static initOptions(options) {
            options = Object.assign({
                srcPkg: require("../package.json"),
            }, options);
            options.logDefault && options.logDefault() || this.logDefault();
            return options;
        }

        static logDefault() {
            winston.remove(winston.transports.Console);
            winston.add(winston.transports.Console, {
                timestamp: () => new Date().toLocaleTimeString([], { hour12: false, }),
                formatter: (options) => {
                    try {
                        var result =  options.timestamp() +' '+ 
                            options.level.toUpperCase() +' '+ 
                            (options.message ? options.message : '') +
                            (options.meta && Object.keys(options.meta).length ? ' '+ JSON.stringify(options.meta) : '') +
                            "";
                        return result;
                    } catch (err) {
                        console.log("winston died", err);
                        return err.message;
                    }
                },
            });
        }   

        get handlers() {
            return super.handlers.concat([
                this.resourceMethod("get", "web-socket", this.getWebSocket),
            ]);
        }

        getWebSocket(req, res, next) {
            var rbws = this.rootApp && this.rootApp.locals.webSocket;
            return rbws && rbws.getModel() || {error: "no web socket"};
        }

        postWebSocket(req, res, next) {
            var rbws = this.rootApp && this.rootApp.locals.rbws;
            if (!rbws) {
                throw new Error("no web socket");
            }
            rbws.setModel(req.body);
            return rbws.getModel();
        }

        getState() {
            var state = super.getState();
            var rbws = this.rootApp && this.rootApp.locals.webSocket;
            rbws && (state = Object.assign(state, rbws.getState()));
            return state;
        }

    } // class RbServer

    module.exports = exports.RbServer = RbServer;
})(typeof exports === "object" ? exports : (exports = {}));
