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
                this.resourceMethod("post", "error", this.onDie),
                this.resourceMethod("post", "hello", this.postHello),
            ].concat(super.handlers);
            Object.defineProperty(this, "handlers", {
                value: handlers,
            });
        }

        getHello(req, res) {
            var that = this;
            return that.greeting;
        }

        postHello(req, res) {
            var that = this;
            return {
                post: req.data,
            }
        }

        onDie(req, res) {
            throw new Error(req.data);
        }
    }

    module.exports = exports.HelloRest = HelloRest;
})(typeof exports === "object" ? exports : (exports = {}));
