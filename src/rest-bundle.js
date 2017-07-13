(function(exports) {
    const ResourceMethod = require("./resource-method");
    const RbHash = require("./rb-hash");
    const path = require("path");
    const fs = require("fs");
    const express = require("express");
    const bodyParser = require("body-parser");
    const winston = require("winston");
    const _rbHash = new RbHash();

    class RestBundle {
        constructor(name, options = {}) {
            if (name == null) {
                throw new Error("bundle name is required");
            }
            winston.info('new', this.constructor.name+'("'+ name + '"...)');
            this.name = name;
            this.uribase = options.uribase || "/" + this.name;
            this.appDir = options.appDir || require.resolve("vue").split("node_modules")[0];
            this.svcDir = options.svcDir || path.join(__dirname, "..");
            this.appPkg = require(path.join(this.appDir, "package.json"));
            this.srcPkg = options.srcPkg || require("../package.json");
            this.node_modules = path.join(this.appDir, "node_modules");
            this.ui_index = options.ui_index || "/ui/index-service";
            this.$onRequestSuccess = options.onRequestSuccess || RestBundle.onRequestSuccess;
            this.$onRequestFail = options.onRequestFail || RestBundle.onRequestFail;
            this.taskBag = []; // unordered task collection with duplicates
            this.apiModelDir = options.apiModelDir || path.join(process.cwd(), "api-model");
        }

        resourceMethod(method, name, handler, mime) {
            if (handler == null) {
                throw new Error("resourceMethod(" + method + ", " + name + ", ?handler?, ...) handler is required");
            }

            var thatHandler = (req, res, next) => {
                return handler.call(this, req, res, next);
            }
            return new ResourceMethod(method, name, thatHandler, mime);
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
            res.status(res.locals.status);
            res.type(res.locals.mime);
            res.send(data);
            next && next('route');
        }

        static onRequestFail(req, res, err, next) {
            var status = res.locals.status !== 200 && res.locals.status || 500;
            res.status(status);
            res.type(res.locals.mime);
            winston.info(req.method, req.url, "=> HTTP"+status, err.message);
            winston.debug(err);
            res.send(res.locals.data || { error: err.message });
            next && next('route');
        }

        pushState() {
            winston.warn("pushState() ignored (no web socket)");
        }

        taskPromise(name, cbPromise) {
            return new Promise((resolve, reject) => {
                var onError = (err, n, level) => {
                    winston[level]("taskPromise#" + n + ":", err);
                    this.taskEnd(name);
                    reject(err);
                }
                try {
                    this.taskBegin(name);
                    try {
                        cbPromise((data) => {
                            try {
                                this.taskEnd(name);
                                resolve(data);
                            } catch (err) {
                                onError(err, 1, "warn"); // implementation error
                            }
                        }, (err) => onError(err, 2, "info")); // cbpromise error
                    } catch (err) {
                        onError(err, 3, "info"); // cbpromise error
                    }
                } catch (err) {
                    onError(err, 4, "warn"); // implementation error
                }
            });
        }

        taskBegin(name) {
            this.taskBag.push(name);
            this.pushState();
        }

        taskEnd(name) {
            if (this.taskBag.length < 1) {
                throw new Error("taskEnd() expected:" + name + " actual:(no pending tasks)");
            }
            var iName = this.taskBag.indexOf(name);
            if (iName < 0) {
                throw new Error("taskEnd() could not locate pending task:" + name);
            }
            this.taskBag.splice(iName, 1);
            this.pushState();
        }

        getState(req, res, next) {
            return {
                tasks: this.taskBag,
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
            return this.taskPromise("postEcho", (resolve, reject) => {
                setTimeout(() => resolve(req.body), 0);
            });
        }

        process(req, res, next, handler, mime) {
            res.locals.status = 200;
            res.locals.mime = mime;
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
            winston.debug(" binding", uripath, "to", views + "/" + template);
            app.get(uripath, (req, res, next) => {
                res.render(template, ejsmap);
            });
        }

        bindExpress(rootApp, restHandlers = this.handlers) {
            var app = express();
            this.rootApp = rootApp;
            rootApp.use("/node_modules", express.static(this.node_modules));
            app.use(bodyParser.json());
            this.bindEjs(app);
            this.bindUI(app);
            restHandlers.sort((a, b) => {
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
                winston.debug("RestBundle.bindExpress:", resource.method,
                    "/" + this.name + "/" + resource.name + " => " + resource.mime);
                this.bindResource(app, resource);
            });
            rootApp.use(this.uribase, app); // don't pollute client's app
            return this;
        }

        apiHash(model) {
            model.rbHash = _rbHash.hash(model);
            return model;
        }

        apiModelPath(name = this.name) {
            return path.normalize(path.join(this.apiModelDir, name + ".json"));
        }

        loadApiModel(name = this.name) {
            return new Promise((resolve, reject) => {
                var amp = this.apiModelPath(name);

                if (fs.existsSync(amp)) {
                    fs.readFile(amp, (err, data) => {
                        if (err) {
                            winston.warn("loadApiModel() ", err, 'E01');
                            reject(err);
                        } else {
                            try {
                                var obj = JSON.parse(data);
                                resolve(obj);
                            } catch (err) {
                                winston.warn("loadApiModel() ", err.message, 'E02');
                                reject(err);
                            }
                        }
                    });
                } else {
                    resolve(null);
                }
            });
        }

        saveApiModel(apiModel, name = this.name) {
            return new Promise((resolve, reject) => {
                let async = function*() {
                    try {
                        var amp = this.apiModelPath(name);
                        var dir = path.dirname(amp);

                        if (!fs.existsSync(dir)) {
                            yield fs.mkdir(dir, (err) => {
                                if (err) {
                                    async.throw(err);
                                } else {
                                    async.next(true);
                                }
                            });
                        }
                        var json = JSON.stringify(apiModel);
                        yield fs.writeFile(amp, json, (err) => {
                            if (err) {
                                async.throw(err);
                            } else {
                                async.next(true);
                            }
                        });
                        resolve(apiModel);
                    } catch (err) {
                        reject(err);
                    }
                }.call(this);
                async.next();
            });
        }

        getApiModel(req, res, next, name) {
            return new Promise((resolve, reject) => {
                this.loadApiModel(name).then(model => resolve({
                    apiModel: this.apiHash(model),
                }))
                .catch(e=>reject(e));
            });
        }

        putApiModel(req, res, next, fileName) {
            return new Promise((resolve, reject) => {
                var async = function *() {
                    try {
                        if (fileName == null) {
                            throw new Error("fileName expected");
                        }
                        var curModel = yield this.loadApiModel(fileName)
                            .then(r=>async.next(r)).catch(e=>async.throw(e));
                        this.apiHash(curModel); // might be unhashed
                        var putModel = req.body && req.body.apiModel;
                        if (putModel == null || putModel.rbHash == null) {
                            var err = new Error("Bad request:" + JSON.stringify(req.body));
                            res.locals.status = 400;
                        } else if (putModel.rbHash !== curModel.rbHash) {
                            var err = new Error("Save ignored--service data has changed: "+
                                curModel.rbHash);
                            res.locals.status = 409;
                        } else {
                            var err = null;
                        } 
                        if (err) { // expected error
                            winston.info(err.message);
                            res.locals.data = {
                                error: err.message,
                                data: {
                                    apiModel: curModel,
                                },
                            }
                            reject(err);
                        } else {
                            this.apiHash(putModel);
                            yield this.saveApiModel(putModel, fileName)
                                .then(r=>async.next(r)).catch(e=>async.throw(e));
                            resolve({
                                apiModel: this.apiHash(putModel), // update hash
                            });
                        }
                    } catch (err) { // unexpected error
                        winston.error(err.message, err.stack);
                        reject(err);
                    }
                }.call(this);
                async.next();
            });
        }

    } // class RestBundle


    module.exports = exports.RestBundle = RestBundle;
})(typeof exports === "object" ? exports : (exports = {}));
