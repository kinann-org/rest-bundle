(function(exports) {
    ///////////////// class ////////////////////
    var pkg = {
        RestBundle: require("./src/rest-bundle"),
        RbWebSocket: require("./src/rb-web-socket"),
        RbServer: require("./src/rb-server"),
        ResourceMethod: require("./src/resource-method"),
    };

    module.exports = exports.RestBundle = pkg;
})(typeof exports === "object" ? exports : (exports = {}));

