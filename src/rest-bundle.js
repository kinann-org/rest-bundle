const ResourceMethod = require("./resource-method");
const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

(function(exports) {
    class RestBundle {
        constructor(name, options = {}) {
            if (name == null) {
                throw new Error("bundle name is required");
            }
            this.name = name;
            this.uribase = options.uribase || "/" + this.name;
            this.appdir = options.appdir || require.resolve("@angular/core").split("node_modules")[0];
            this.appPkg = require(path.join(this.appdir,"package.json"));
            this.srcPkg = options.srcPkg || require("../package.json");
            this.node_modules = path.join(this.appdir, "node_modules");
            this.ui_index = options.ui_index || "/ui/index-jit";
            this.$onSuccess = options.onSuccess || RestBundle.onSuccess;
            this.$onFail = options.onFail || RestBundle.onFail;
        }

        resourceMethod(method, name, handler, mime) {
            var that = this; // Javascript nonsense
            function thatHandler(req, res, next) {
                return handler.call(that, req, res, next);
            }
            return new ResourceMethod(method, name, thatHandler, mime);
        }

        get handlers() {
            return [
                this.resourceMethod("get", "/identity", this.getIdentity),
            ];
        }

        static onSuccess(req, res, data, next, mime) {
            res.status(200);
            res.type(mime);
            res.send(data);
            next && next('route');
        }

        static onFail(req, res, err, next) {
            res.status(500);
            res.type("application/json");
            var data = {
                error: err.message,
            }
            res.send(data);
            next && next('route');
        }

        getIdentity(req, res, next) {
            return {
                name: this.name,
                package: this.srcPkg.name,
                version: this.srcPkg.version,
            }
        }

        process(req, res, next, handler, mime) {
            var promise = new Promise((resolve, reject) => resolve(handler(req, res)));
            promise.then(
                (data) => this.$onSuccess(req, res, data, next, mime),
                (err) => this.$onFail(req, res, err, next)
            );
            return promise;
        }

        bindAngular(app) {
            app.use(this.uribase + "/ui/pub", express.static(path.join(this.appdir, "src/ui/pub")));
            app.use(this.uribase + "/ui/aot", express.static(path.join(this.appdir, "src/ui/aot")));
            app.use(this.uribase + "/ui/app", express.static(path.join(this.appdir, "src/ui/app")));
            app.use(this.uribase + "/dist", express.static(path.join(this.appdir, "dist")));
            app.use("/node_modules", express.static(this.node_modules));
            app.get(this.uribase + "/ui", (req, res, next) => res.redirect(this.uribase + this.ui_index));
        }

        bindResource(app, resource) {
            var mime = resource.mime || "application/json";
            var method = (resource.method || "get").toUpperCase();
            var path = resource.name.startsWith("/") ? resource.name : ("/" + resource.name);
            var path = this.uribase + path;
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
            }
        }

        bindEjs(app) {
            app.set("views", "./src/ui/views");
            app.set("view engine", "ejs");
            var ejsmap = {
                service: this.name,
                package: this.appPkg.name,
                version: this.appPkg.version,
            }
            app.get(this.uribase + "/ui/index-aot", (req, res, next) => {
                res.render("index-aot.ejs", ejsmap);
            });
            app.get(this.uribase + "/ui/index-dist", (req, res, next) => {
                res.render("index-dist.ejs", ejsmap);
            });
            app.get(this.uribase + "/ui/index-jit", (req, res, next) => {
                res.render("index-jit.ejs", ejsmap);
            });
        }

        bindExpress(app, restHandlers = this.handlers) {
            app.use(bodyParser.json());
            this.bindEjs(app);
            this.bindAngular(app);
            restHandlers.forEach((resource) => this.bindResource(app, resource));
        }
    }

    module.exports = exports.RestBundle = RestBundle;
})(typeof exports === "object" ? exports : (exports = {}));
