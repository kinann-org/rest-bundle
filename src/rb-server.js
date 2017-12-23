/**
 * RbServer is the RestBundle for a server singleton
 * that manages shared resources such as rb-socket-server.
 */
(function(exports) {
    const winston = require("winston");
    const RbSocketServer = require("./rb-socket-server");
    const RestBundle = require("./rest-bundle");
    const WEB_SOCKET_MODEL = "RbServer.web-socket";

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
                timestamp: () => new Date().toLocaleString([], { hour12: false, }),
                formatter: (options) => {
                    var result =  options.timestamp() +' '+ 
                        options.level.toUpperCase() +' '+ 
                        (options.message ? options.message : '');
                    try {
                        if (options.meta) {
                            var keys = Object.keys(options.meta);
                            if (keys.length) {
                                result +=  ' '+ (options.meta.message != null ? options.meta.message : JSON.stringify(options.meta));
                            }
                        }
                        return result;
                    } catch (err) {
                        console.log("winston logging error", err, Object.keys(options.meta));
                        return result + err.message;
                    }
                },
            });
        }

        get handlers() {
            return super.handlers.concat([
                this.resourceMethod("get", "web-socket", this.getWebSocket),
                this.resourceMethod("put", "web-socket", this.putWebSocket),
            ]);
        }

        loadApiModel(name) { // override
            return new Promise((resolve, reject) => {
                super.loadApiModel(WEB_SOCKET_MODEL)
                .then(model => {
                    if (!this.rbss) {
                        reject(new Error("no web socket"));
                    } else if (model) {
                        resolve(this.rbss.setModel(model)); // update memory model 
                    } else {
                        resolve(this.rbss.getModel());
                    }
                })
                .catch(e=>reject(e));
            });
        }

        saveApiModel(model, fileName) {
            return new Promise((resolve, reject) => {
                super.saveApiModel(model, fileName)
                .then(r => {
                    if (fileName === WEB_SOCKET_MODEL) {
                        this.rbss.setModel(model);
                    }
                    resolve(r);
                })
                .catch(e => reject(e));
            });
        }

        getWebSocket(req, res, next) {
            return this.getApiModel(req, res, next, WEB_SOCKET_MODEL);
        }

        putWebSocket(req, res, next) {
            return this.putApiModel(req, res, next, WEB_SOCKET_MODEL);
        }

        getState() {
            var state = super.getState();
            var rbss = this.rbss;
            rbss && (state = Object.assign(state, rbss.getState()));
            return state;
        }

        close() {
            if (this.rootApp) {
                if (this.rbss) {
                    winston.info("closing RbSocketServer");
                    this.rbss.close();
                }
                if (this.httpServer) {
                    winston.info("closing web server");
                    this.httpServer && this.httpServer.close();
                }
            }
        }

        listen(app, restBundles, ports=[80,8080]) {
            ports = ports.concat(new Array(100).fill(3000).map((p,i) => p+i));
            try {
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
                this.rbss = new RbSocketServer(restBundles, this.httpServer);
                this.loadApiModel(WEB_SOCKET_MODEL)
                    .then(result => {
                        if (result) {
                            this.rbss.setModel(result);
                        }
                    })
                    .catch(e=>{throw(e);});
            } catch (err) {
                winston.error('rb-server:', err.stack);
                throw err;
            }
            return this;
        }

    } // class RbServer

    module.exports = exports.RbServer = RbServer;
})(typeof exports === "object" ? exports : (exports = {}));
