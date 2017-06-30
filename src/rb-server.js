/**
 * RbServer is the RestBundle for a server singleton
 * that manages shared resources such as rb-web-socket.
 */
(function(exports) {
    const winston = require("winston");
    const RbWebSocket = require("./rb-web-socket");
    const RestBundle = require("./rest-bundle");

    class RbServer extends RestBundle {
        constructor(name, options = {}) {
            super("RbServer", Object.assign({
                srcPkg: require("../package.json"),
            }, options));
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
