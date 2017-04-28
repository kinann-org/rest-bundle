(function(exports) {
    class ResourceMethod {
        constructor(method = "get", name, handler, mime = "application/json", options = {}) {
            this.name = name;
            this.mime = mime;
            this.method = method;
            this.handler = handler || this.notImplemented;
        }
        notImplemented(req, res) {
            throw new Error("HTTP500 not implemented");
        }
    }

    module.exports = exports.ResourceMethod = ResourceMethod;
})(typeof exports === "object" ? exports : (exports = {}));
