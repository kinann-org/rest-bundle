(function(exports) {
    const ResourceMethod = require("./resource-method");
    const EventEmitter = require('events');
    const RbHash = require("./rb-hash");
    const srcPkg = require("../package.json");
    const path = require("path");
    const os = require('os');
    const fs = require("fs");
    const express = require("express");
    const bodyParser = require("body-parser");
    const logger = require("log-instance").LogInstance.singleton;
    const _rbHash = new RbHash();
    const { exec } = require("child_process");
    const util = require('util');
    const v8 = require('v8');

    class RestBundle {
        constructor(name='test', options = {}) {
            if (typeof name !== 'string') {
                throw new Error(`bundle name is required: ${name}`);
            }
            logger.info(`RestBundle.ctor(${name})`);
            this.name = name;
            this.uribase = options.uribase || "/" + this.name;
            this.appDir = options.appDir || 
                require.resolve("vue").split("node_modules")[0];
            this.svcDir = options.svcDir || path.join(__dirname, "..");
            this.srcPkg = options.srcPkg || require("../package.json");
            this.node_modules = path.join(this.appDir, "node_modules");
            this.emitter = options.emtitter || new EventEmitter();
            this.ui_index = options.ui_index || "/ui/index-service";
            this.$onRequestSuccess = options.onRequestSuccess || 
                RestBundle.onRequestSuccess;
            this.$onRequestFail = options.onRequestFail || RestBundle.onRequestFail;
            this.taskBag = []; // unordered task collection with duplicates
            this.apiModelDir = options.apiModelDir || 
                path.join(process.cwd(), "api-model");
        }

        initialize() {
            if (this.initialized) {
                return Promise.resolve(this.initializeResult);
            }
            if (this.initialized === false) {
                return new Promise((resolve, reject) => {
                    this.emitter.addListener('initialized', (that)=>{
                        resolve(that.initializeResult);
                    });
                });
            }
            this.initialized = false;
            logger.info(`RestBundle-${this.name}.initialize()`);
            return new Promise((resolve,reject) => {
                var that = this;
                that.loadApiModel().then(r=> {
                    that.onApiModelLoaded(r); 
                    that.onInitializeEvents(that.emitter, r); 
                    that.initialized = true;
                    that.initializeResult = r;
                    that.emitter.emit('initialized', that);
                    resolve(r);
                }).catch(e=>reject(e));
            });
        }

        onApiModelLoaded(apiModel) {
            // => 1) construct configured objects
            //    2) send initial events
        }

        onInitializeEvents(emitter, apiModel) {
            //    1) construct configured objects
            // => 2) send initial events
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
                this.resourceMethod("get", "app/stats/:stat", this.getAppStats),
                this.resourceMethod("post", "identity", this.postIdentity),
                this.resourceMethod("post", "echo", this.postEcho),
            ];
        }

        static onRequestSuccess(req, res, data, next, mime) {
            try {
                res.status(res.locals.status);
                res.type(res.locals.mime);
                res.send(data);
            } catch (err) {
                logger.warn(err.stack);
                res.status(500);
                res.send({error:err.message});
            }
            next && next('route');
        }

        static onRequestFail(req, res, err, next) {
            var status = res.locals.status !== 200 && res.locals.status || 500;
            res.status(status);
            res.type(res.locals.mime || 'application/json');
            res.send(res.locals.data || { error: err.message });
            next && next('route');
        }

        pushState() {
            logger.warn("RestBundle.pushState() ignored (no web socket)");
        }

        taskPromise(name, cbPromise) {
            return new Promise((resolve, reject) => {
                var onError = (err, n, level) => {
                    logger[level]("taskPromise#" + n + ":", err.stack);
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

        getAppStats(req, res, next) {
            var stat = req.params.stat || "heap";
            return new Promise((resolve, reject) => {
                try {
                    if (stat === 'heap') {
                        resolve(v8.getHeapSpaceStatistics());
                    } else {
                        resolve(v8.getHeapSpaceStatistics());
                    }
                } catch (e) {
                    logger.warn(e.stack);
                    reject(e);
                }
            });
        }

        getState(req, res, next) {
            return {
                tasks: this.taskBag,
            }
        }

        async getIdentity(req, res, next) { try {
            var execPromise = util.promisify(exec);
            var cmd = "df --total -B 1 /";
            var execOpts = {
                cwd: __dirname,
            }
            var res = await execPromise(cmd, execOpts);
            var stdout = res.stdout.split('\n');
            var stats = stdout[2].split(/\s\s*/);
            let diskused = Number(stats[2]);
            let diskavail = Number(stats[3]);
            let disktotal = diskused + diskavail;
            return {
                name: this.name,
                package: this.srcPkg.name,
                version: this.srcPkg.version,
                hostname: os.hostname(),
                uptime: os.uptime(),
                loadavg: os.loadavg(),
                totalmem: os.totalmem(),
                freemem: os.freemem(),
                diskavail,
                diskfree: diskavail,
                disktotal: disktotal,
            }
        } catch(e) {
            logger.warn(`getIdentity()`, e.message);
            throw e;
        }}

        postIdentity(req, res, next) {
            throw new Error("POST not supported: " + JSON.stringify(req.body));
        }

        postEcho(req, res, next) {
            return this.taskPromise("postEcho", (resolve, reject) => {
                setTimeout(() => resolve(req.body), 0);
            });
        }

        handleRequestError(req, res, err, next) {
            logger.warn(`RestBundle.handleRequestError(${req.method} ${req.url})`);
            logger.warn(err.stack);
            this.$onRequestFail(req, res, err, next)
        }

        processRequest(req, res, next, handler, mime) {
            res.locals.status = 200;
            res.locals.mime = mime;
            try {
                var result = handler(req, res);
                if (result instanceof Promise) {
                    result.then(data => {
                        this.$onRequestSuccess(req, res, data, next, mime);
                    }).catch(err => {
                        this.handleRequestError(req, res, err, next);
                    });
                } else {
                    this.$onRequestSuccess(req, res, result, next, mime);
                }
            } catch (err) {
                this.handleRequestError(req, res, err, next);
            }
        }

        bindResource(app, resource) {
            var mime = resource.mime || "application/json";
            var method = (resource.method || "get").toUpperCase();
            var path = "/" + resource.name;
            if (method === "GET") {
                app.get(path, (req, res, next) =>
                    this.processRequest(req, res, next, resource.handler, mime));
            } else if (method === "POST") {
                app.post(path, (req, res, next) =>
                    this.processRequest(req, res, next, resource.handler, mime));
            } else if (method === "PUT") {
                app.put(path, (req, res, next) =>
                    this.processRequest(req, res, next, resource.handler, mime));
            } else if (method === "DELETE") {
                app.delete(path, (req, res, next) =>
                    this.processRequest(req, res, next, resource.handler, mime));
            } else if (method === "HEAD") {
                app.head(path, (req, res, next) =>
                    this.processRequest(req, res, next, resource.handler, mime));
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
            logger.debug(" binding", uripath, "to", views + "/" + template);
            app.get(uripath, (req, res, next) => {
                res.render(template, ejsmap);
            });
        }

        bindExpress(rootApp, restHandlers = this.handlers) {
            var app = this.app = express();
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
                logger.debug("RestBundle.bindExpress:", resource.method,
                    "/" + this.name + "/" + resource.name + " => " + resource.mime);
                this.bindResource(app, resource);
            });
            rootApp.use(this.uribase, app); // don't pollute client's app
            rootApp.disable('x-powered-by'); // suppress header warning
            app.disable('x-powered-by'); // suppress header warning
            return this;
        }

        apiHash(model) {
            delete model.rbHash;
            model.rbHash = _rbHash.hash(model);
            return model;
        }

        apiModelPath(name = this.name) {
            var fileName = `${this.srcPkg.name}.${name}.json`;
            return path.normalize(path.join(this.apiModelDir, fileName));
        }

        updateApiModel(apiModel) {
            return apiModel ;
        }

        loadApiModel(name = this.name) {
            return new Promise((resolve,reject) => {
                var modelPath = this.apiModelPath(name);
                try {
                    this.loadApiFile(modelPath).then(fileApiModel => {
                        resolve(this.updateApiModel(fileApiModel));
                    }).catch(e => {
                        logger.error(`RestBundle.loadApiModel(${name})`, e.stack);
                        reject(e);
                    });
                } catch (e) {
                    logger.error(`RestBundle.loadApiModel(${name})`, e.stack);
                    reject(e);
                }
            });
        }

        saveApiModel(apiModel, name = this.name) {
            return this.saveApiFile(apiModel, this.apiModelPath(name));
        }

        loadApiFile(modelPath=this.apiModelPath(this.name)) {
            return new Promise((resolve, reject) => {
                if (fs.existsSync(modelPath)) {
                    fs.readFile(modelPath, (err, data) => {
                        if (err) {
                            logger.warn(`RestBundle-${this.name}.loadApiModel() file:${modelPath}`, err, 'E01');
                            reject(err);
                        } else {
                            try {
                                var obj = JSON.parse(data);
                                var rbHash = obj.rbHash;
                                logger.debug(`RestBundle-${this.name}.loadApiModel() file:${modelPath}`);
                                logger.info(`RestBundle-${this.name}.loadApiModel() rbHash:${rbHash}`);
                                resolve(obj);
                            } catch (err) {
                                logger.warn(`RestBundle-${this.name}.loadApiModel() file:${modelPath}`, err.message, 'E02');
                                reject(err);
                            }
                        }
                    });
                } else {
                    logger.debug(`RestBundle-${this.name}.loadApiModel() unavailable:${modelPath} `);
                    resolve(null);
                }
            });
        }

        saveApiFile(apiModel, modelPath=this.apiModelPath()) {
            return new Promise((resolve, reject) => {
                let async = function*() {
                    try {
                        var dir = path.dirname(modelPath);

                        if (!fs.existsSync(dir)) {
                            yield fs.mkdir(dir, (err) => {
                                if (err) {
                                    async.throw(err);
                                } else {
                                    async.next(true);
                                }
                            });
                        }
                        var json = JSON.stringify(apiModel, null, "    ") + "\n";
                        yield fs.writeFile(modelPath, json, (err) => {
                            if (err) {
                                async.throw(err);
                            } else {
                                logger.info(`RestBundle.saveApiModel()`,
                                    `${json.length} characters written to ${modelPath}`);
                                async.next(true);
                            }
                        });
                        resolve(apiModel);
                    } catch (err) {
                        logger.warn(err.stack);
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
                .catch(e=>{
                    logger.warn(e.stack);
                    reject(e);
                });
            });
        }

        putApiModel(req, res, next, name=this.name) {
            var that = this;
            return new Promise((resolve, reject) => {
                var async = function *() {
                    try {
                        var curModel = yield that.loadApiModel(name)
                            .then(r=>async.next(r)).catch(e=>async.throw(e));
                        curModel = curModel || {};
                        that.apiHash(curModel); // might be unhashed
                        var putModel = req.body && req.body.apiModel;
                        if (putModel == null || putModel.rbHash == null) {
                            var err = new Error("Bad request:" + JSON.stringify(req.body));
                            res.locals.status = 400;
                        } else if (putModel.rbHash !== curModel.rbHash) {
                        console.log(curModel, putModel);
                            var err = new Error("Save ignored--service data has changed: "+
                                curModel.rbHash);
                            res.locals.status = 409;
                        } else {
                            var err = null;
                        } 
                        if (err) { // expected error
                            logger.info(err.stack);
                            res.locals.data = {
                                error: err.message,
                                data: {
                                    apiModel: curModel,
                                },
                            }
                            reject(err);
                        } else {
                            var updatedModel = Object.assign({}, curModel, putModel);
                            that.apiHash(updatedModel);
                            yield that.saveApiModel(updatedModel, name)
                                .then(r=>async.next(r)).catch(e=>async.throw(e));
                            resolve({
                                apiModel: that.apiHash(updatedModel), // update hash
                            });
                        }
                    } catch (err) { // unexpected error
                        logger.warn(err.stack);
                        reject(err);
                    }
                }.call(that);
                async.next();
            });
        }

    } // class RestBundle


    module.exports = exports.RestBundle = RestBundle;
})(typeof exports === "object" ? exports : (exports = {}));
