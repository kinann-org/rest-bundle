(function(exports) {
    ///////////////// class ////////////////////
    var pkg = {
        RestBundle: require("./src/rest-bundle"),
        RbWebSocketServer: require("./src/rb-web-socket-server"),
        RbServer: require("./src/rb-server"),
        ResourceMethod: require("./src/resource-method"),
    };

    module.exports = exports.RestBundle = pkg;
})(typeof exports === "object" ? exports : (exports = {}));

