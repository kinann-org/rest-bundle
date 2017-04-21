const RestBundle = require("../src/rest-bundle");
const ResourceMethod = RestBundle.ResourceMethod;

(function(exports) {

    // Example of extending RestBundle to define a "hello" REST service
    class HelloRest extends RestBundle {
        constructor(name="greeting",options = {}) {
            super(name, options);
        }

        get handlers() {return [
            new ResourceMethod("get", "hello", this.getHello, "text/html"),
            new ResourceMethod("post", "hello", this.onDie),
        ]}

        getHello(req, res) {
            return "hello";
        }

        onDie(req, res) {
            throw new Error("goodbye");
        }
    }

    module.exports = exports.HelloRest = HelloRest;
})(typeof exports === "object" ? exports : (exports = {}));
