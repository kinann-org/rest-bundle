const RestBundle = require("../src/rest-bundle");
const ResourceMethod = RestBundle.ResourceMethod;

(function(exports) {

    // Example of extending RestBundle to define a "hello" REST service
    class HelloRest extends RestBundle {
        constructor(name = "greeting", options = {}) {
            super(name, options);
            this.greeting = "hello";
            var handlers = [
                this.resourceMethod("get", "hello", this.getHello, "text/html"),
                this.resourceMethod("post", "error", this.postDeath),
                this.resourceMethod("post", "hello", this.postHello),
            ].concat(super.handlers);
            Object.defineProperty(this, "handlers", {
                value: handlers,
            });
        }

        getHello(req, res) {
            return this.greeting;
        }

        postHello(req, res) {
            return {
                post: req.body,
            }
        }

        postDeath(req, res) {
            throw new Error("Sadness");
        }
    }

    module.exports = exports.HelloRest = HelloRest;
})(typeof exports === "object" ? exports : (exports = {}));
