const RestBundle = require("../src/rest-bundle");
const ResourceMethod = RestBundle.ResourceMethod;

(function(exports) {

    // Example of extending RestBundle to define a "hello" REST service
    class HelloRest extends RestBundle {
        constructor(name="greeting",options = {}) {
            super(name, options);
            this.greeting = "hello";
            var handlers = [
                this.resourceMethod("get", "hello", this.getHello, "text/html"),
                this.resourceMethod("post", "hello", this.onDie),
            ];
            Object.defineProperty(this, "handlers", {
                value: handlers,
            });
        }

        getHello(req, res) {
            var that = this;
            return that.greeting;
        }

        onDie(req, res) {
            throw new Error(req.data);
        }
    }

    module.exports = exports.HelloRest = HelloRest;
})(typeof exports === "object" ? exports : (exports = {}));
