const ResourceMethod = require("./resource-method");
const path = require("path");
const fs = require("fs");
const express = require("express");

(function(exports) {
    class RestBundle {
        constructor(name, options = {}) {
            if (name == null) {
                throw new Error("bundle name is required");
            }
            this.name = name;
            this.uribase = options.uribase || "/"+this.name;
            this.rest_bundle = path.dirname(path.dirname(__filename));
            this.uidir = options.uidir || path.join(this.rest_bundle, "src/ui");
            this.pub = options.pub || "pub";
            this.node_modules = path.join(require.resolve("@angular/core").split("node_modules")[0],"node_modules");
            this.appdir = options.appdir || "app";
            this.uiindex = options.uiindex || "app/index.html";
            this.$onSuccess = options.onSuccess || RestBundle.onSuccess;
            this.$onFail = options.onFail || RestBundle.onFail;
        }

        resourceMethod(method, name, handler, mime) {
            var that  = this; // Javascript nonsense
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
            var fpath = path.join(this.uidir, this.appdir, urlparts[urlparts.length-1]);
            var str = fs.readFileSync(fpath).toString("UTF-8");
            return str.replace(/REST-BUNDLE/g,this.name);
        }

        getUIHtml(req, res, next) {
            var str = fs.readFileSync(path.join(this.uidir, this.uiindex)).toString("UTF-8");
            return str.replace(/REST-BUNDLE/g,this.name);
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
            this.bindResource(app,this.resourceMethod(
                "get", "/ui/app/*", this.getApp, "application/javascript"));
            app.use(this.uribase + "/ui/node_modules", express.static(this.node_modules)); 
            this.bindResource(app,this.resourceMethod(
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

        bindExpress(app, handlers = this.handlers) {
            this.bindAngular(app);
            handlers.forEach((resource) => this.bindResource(app,resource));
        }
    }

    module.exports = exports.RestBundle = RestBundle;
})(typeof exports === "object" ? exports : (exports = {}));
