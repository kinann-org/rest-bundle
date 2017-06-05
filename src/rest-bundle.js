(function(exports) {
    const ResourceMethod = require("./resource-method");
    const path = require("path");
    const express = require("express");
    const bodyParser = require("body-parser");
    const winston = require("winston");
    const WebSocket = require("ws");

    class RbWebSocket {
        constructor(restBundles, listener, options={}) {
            if (!listener) {
                throw new Error("RbWebSocket(restBundle,listener,options) listener is required");
            }
            this.restBundles = restBundles;
            this.restBundles.forEach( rb => {
                var that = this;
                rb.pushState = function() {
                    winston.debug("direct pushState");
                    that.pushState();
                }
            });
            this.listener = listener;
            this.wss = new WebSocket.Server({ server: listener });
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
            var message = JSON.stringify({ type, data });
            winston.debug("pushing ", message);
            this.sockets.forEach((ws) => ws.send(message));
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

    class RestBundle {
        constructor(name, options = {}) {
            if (name == null) {
                throw new Error("bundle name is required");
            }
            this.name = name;
            this.uribase = options.uribase || "/" + this.name;
            this.appDir = options.appDir || require.resolve("vue").split("node_modules")[0];
            this.svcDir = options.svcDir || path.join(__dirname, "..");
            this.appPkg = require(path.join(this.appDir,"package.json"));
            this.srcPkg = options.srcPkg || require("../package.json");
            this.node_modules = path.join(this.appDir, "node_modules");
            this.ui_index = options.ui_index || "/ui/index-service";
            this.$onRequestSuccess = options.onRequestSuccess || RestBundle.onRequestSuccess;
            this.$onRequestFail = options.onRequestFail || RestBundle.onRequestFail;
        }

        resourceMethod(method, name, handler, mime) {
            var that = this; // Javascript nonsense
            if (handler == null) {
                throw new Error("resourceMethod("+method+", "+name+", ?handler?, ...) handler is required");
            }
            function thatHandler(req, res, next) {
                return handler.call(that, req, res, next);
            }
            return new ResourceMethod(method, name, thatHandler, mime);
        }

        static get RbWebSocket() {
            return RbWebSocket;
        }

        get handlers() {
            return [
                this.resourceMethod("get", "identity", this.getIdentity),
                this.resourceMethod("get", "state", this.getState),
                this.resourceMethod("post", "identity", this.postIdentity),
                this.resourceMethod("post", "echo", this.postEcho),
            ];
        }

        static onRequestSuccess(req, res, data, next, mime) {
            res.status(200);
            res.type(mime);
            res.send(data);
            next && next('route');
        }

        static onRequestFail(req, res, err, next) {
            res.status(500);
            res.type("application/json");
            winston.log("info", req.method, req.url, "=> HTTP500", err);
            var data = {
                error: err.message,
            }
            res.send(data);
            next && next('route');
        }

        pushState() {
            winston.warn("You must create an RbWebSocket to pushState()");
        }

        getState(req, res, next) {
            return {
                heartbeat: Math.round(Date.now() / 1000),
            }
        }

        getIdentity(req, res, next) {
            return {
                name: this.name,
                package: this.srcPkg.name,
                version: this.srcPkg.version,
            }
        }

        postIdentity(req, res, next) {
            throw new Error("POST not supported: " + JSON.stringify(req.body));
        }

        postEcho(req, res, next) {
            return new Promise((resolve, reject) => 
                setTimeout(() => resolve(req.body), 100)
            );
        }

        process(req, res, next, handler, mime) {
            var promise = new Promise((resolve, reject) => {
                var result = handler(req, res);
                if (result instanceof Promise) {
                    result.then(data => resolve(data)).catch(err => reject(err));
                } else {
                    resolve(result);
                }
            });
            promise.then(
                (data) => this.$onRequestSuccess(req, res, data, next, mime),
                (err) => this.$onRequestFail(req, res, err, next)
            );
            return promise;
        }

        bindResource(app, resource) {
            var mime = resource.mime || "application/json";
            var method = (resource.method || "get").toUpperCase();
            var path = "/" + resource.name;
            if (method === "GET") {
                app.get(path, (req, res, next) =>
                    this.process(req, res, next, resource.handler, mime));
            } else if (method === "POST") {
                app.post(path, (req, res, next) =>
                    this.process(req, res, next, resource.handler, mime));
            } else if (method === "PUT") {
                app.put(path, (req, res, next) =>
                    this.process(req, res, next, resource.handler, mime));
            } else if (method === "DELETE") {
                app.delete(path, (req, res, next) =>
                    this.process(req, res, next, resource.handler, mime));
            } else if (method === "HEAD") {
                app.head(path, (req, res, next) =>
                    this.process(req, res, next, resource.handler, mime));
            } else {
                throw new Error("Unsupported HTTP method:", method);
            }
        }

        bindUI(app) {
            app.use("/dist", express.static(path.join(this.appDir, "dist")));
            app.get("/ui", (req, res, next) => res.redirect(this.uribase + this.ui_index));
            app.use("/ui", express.static(path.join(this.appDir, "src/ui")));
        }

        bindEjs(app) {
            var views = path.join(this.svcDir, "src/ui/ejs");
            app.set("views", path.join(this.svcDir, "src/ui/ejs"));
            app.set("view engine", "ejs");
            var ejsmap = {
                service: this.name,
                package: this.srcPkg.name,
                version: this.srcPkg.version,
            }
            var uripath = "/ui/index-service";
            var template = "index-service.ejs";
            winston.debug( " binding", uripath, "to", views+"/"+template);
            app.get(uripath, (req, res, next) => {
                res.render(template, ejsmap);
            });
        }

        bindExpress(rootApp, restHandlers = this.handlers) {
            var app = express();
            rootApp.use("/node_modules", express.static(this.node_modules));
            app.use(bodyParser.json());
            this.bindEjs(app);
            this.bindUI(app);
            restHandlers.sort((a,b) => {
                var cmp = a.method.localeCompare(b.method);
                if (cmp === 0) {
                    cmp = a.name.localeCompare(b.name);
                    if (cmp === 0) {
                        var msg = "REST resources must have unique handlers: " + a.method + " " + a.name;
                        throw new Error(msg);
                    }
                }
                return cmp;
            });
            restHandlers.forEach((resource) => {
                winston.debug("RestBundle.bindExpress:", resource.method, "/"+this.name+"/"+resource.name +" => "+ resource.mime);
                this.bindResource(app, resource);
            });
            rootApp.use(this.uribase, app); // don't pollute client's app
            return this;
        }
    }

    module.exports = exports.RestBundle = RestBundle;
})(typeof exports === "object" ? exports : (exports = {}));
