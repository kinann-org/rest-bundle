/**
 * RbServer is the RestBundle for a server singleton
 * that manages shared resources such as rb-socket-server.
 */
(function(exports) {
    const winston = require("winston");
    const RbSocketServer = require("./rb-socket-server");
    const RestBundle = require("./rest-bundle");
    const RbHash = require("./rb-hash");

    class RbServer extends RestBundle {
        constructor(name, options = {}) {
            super("RbServer", RbServer.initOptions(options));
            this.rbh = new RbHash();
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

        getWebSocket(req, res, next) {
            if (!this.rbss) {
                throw new Error("no web socket");
            }
            var model = this.rbss.getModel();
            model.rbhash = this.rbh.hash(model);
            return {
                apiModel: model,
            }
        }

        putWebSocket(req, res, next) {
            var rbss = this.rbss;
            if (!rbss) {
                throw new Error("no web socket");
            }
            var model = rbss.getModel();
            var hash = this.rbh.hash(model);
            var apiModel = req.body.apiModel;
            if (apiModel == null || apiModel.rbhash == null) {
                var err = new Error("Bad request:" + JSON.stringify(req.body));
                res.locals.status = 400;
                res.locals.data = {
                    error: err.message,
                }
                throw err;
            }
            if (apiModel.rbhash !== hash) {
                var err = new Error("Save ignored--service data has changed.");
                res.locals.status = 409;
                var model = this.rbss.getModel();
                model.rbhash = this.rbh.hash(model);
                res.locals.data = {
                    error: err.message,
                    data: {
                        apiModel: model,
                    }
                }
                throw err;
            }
            rbss.setModel(apiModel);
            var model = rbss.getModel();
            model.rbhash = this.rbh.hash(model);
            return {
                apiModel: model
            }
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
            } catch (err) {
                winston.error(err);
                throw err;
            }
            return this;
        }

    } // class RbServer

    module.exports = exports.RbServer = RbServer;
})(typeof exports === "object" ? exports : (exports = {}));
