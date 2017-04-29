const ResourceMethod = require("./resource-method");
const path = require("path");
const fs = require("fs");
const express = require("express");
var pkg = require("../package.json");

(function(exports) {
    class RestBundle {
        constructor(name, options = {}) {
            if (name == null) {
                throw new Error("bundle name is required");
            }
            this.name = name;
            this.uribase = options.uribase || "/" + this.name;
            this.package_dir = path.dirname(path.dirname(__filename));
            this.uidir = options.uidir || path.join(this.package_dir, "src/ui");
            this.pub = options.pub || "pub";
            this.aot = options.aot || "aot";
            this.node_modules = path.join(require.resolve("@angular/core").split("node_modules")[0], "node_modules");
            this.appdir = options.appdir || "app";
            this.uiindex = options.uiindex || "app/index-jit.html";
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
            throw new Error("virtual method must be implemented");
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

        getApp(req, res, next) {
            var urlparts = req.url.split("/");
            var fpath = path.join(this.uidir, this.appdir, urlparts[urlparts.length - 1]);
            var str = fs.readFileSync(fpath).toString("UTF-8");
            return str.replace(/REST_BUNDLE/g, this.name);
        }

        getUIHtml(req, res, next) {
            var str = fs.readFileSync(path.join(this.uidir, this.uiindex)).toString("UTF-8");
            return str.replace(/REST_BUNDLE/g, this.name);
        }

        getIdentity(req, res, next) {
            return {
                name: this.name,
                type: "RestBundle",
                version: pkg.version,
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
            app.use(this.uribase + "/ui/pub", express.static(path.join(this.uidir, this.pub)));
            app.use(this.uribase + "/ui/aot", express.static(path.join(this.uidir, this.aot)));
            app.use(this.uribase + "/dist", express.static(path.join(this.package_dir, "dist")));
            this.bindResource(app, this.resourceMethod(
                "get", "/ui/index-jit.html", this.getApp, "text/html"));
            this.bindResource(app, this.resourceMethod(
                "get", "/ui/index-aot.html", this.getApp, "text/html"));
            this.bindResource(app, this.resourceMethod(
                "get", "/ui/index-dist.html", this.getApp, "text/html"));
            this.bindResource(app, this.resourceMethod(
                "get", "/ui/app/*", this.getApp, "application/javascript"));
            app.use("/node_modules", express.static(this.node_modules));
            this.bindResource(app, this.resourceMethod(
                "get", "/ui", this.getUIHtml, "text/html"));
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
            app.get(this.uribase + "/ui/index-aot", (req, res, next) => {
                res.render("index-aot.ejs", {rest:this.name});
            });
            app.get(this.uribase + "/ui/index-dist", (req, res, next) => {
                res.render("index-dist.ejs", {rest:this.name});
            });
            app.get(this.uribase + "/ui/index-jit", (req, res, next) => {
                res.render("index-jit.ejs", {rest:this.name});
            });
        }

        bindExpress(app, handlers = this.handlers) {
            this.bindEjs(app);
            this.bindAngular(app);
            handlers.forEach((resource) => this.bindResource(app, resource));
            this.bindResource(app, this.resourceMethod(
                "get", "/identity", this.getIdentity));
        }
    }

    module.exports = exports.RestBundle = RestBundle;
})(typeof exports === "object" ? exports : (exports = {}));
