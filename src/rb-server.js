/**
 * RbServer is the RestBundle for a server singleton
 * that manages shared resources such as rb-socket-server.
 */
(function(exports) {
    const winston = require("winston");
    const RbSocketServer = require("./rb-socket-server");
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
            return this.rbwss && this.rbwss.getModel() || {error: "no web socket"};
        }

        postWebSocket(req, res, next) {
            var rbwss = this.rbwss;
            if (!rbwss) {
                throw new Error("no web socket");
            }
            rbwss.setModel(req.body);
            return rbwss.getModel();
        }

        getState() {
            var state = super.getState();
            var rbwss = this.rbwss;
            rbwss && (state = Object.assign(state, rbwss.getState()));
            return state;
        }

        close() {
            if (this.rootApp) {
                this.rbwss.close();
                winston.info("closing web server");
                this.httpServer.close();
            }
        }

        listen(app, restBundles, ports = [8080,80, 3000]) {
            if (this.httpServer) {
                throw new Error(this.constructor.name + ".listen() can only be called once");
            }
            if (restBundles.filter(rb=>rb===this)[0] == null) {
                restBundles.push(this);
            }
            restBundles.forEach(rb => rb.bindExpress(app));

            this.httpServer = ports.reduce( (listener, port) => {
                return listener.listening && listener
                || app.listen(port).on('error', function(error) {
                    if (error.code === "EACCES") { 
                        // 80 requires root
                    } else if (error.code === "EADDRINUSE" ) {
                        // supertest doesn't release port
                    } else { 
                        throw error; 
                    }
                })
            }, {});
            this.rbwss = new RbSocketServer(restBundles, this.httpServer);
            return this;
        }

    } // class RbServer

    module.exports = exports.RbServer = RbServer;
})(typeof exports === "object" ? exports : (exports = {}));
