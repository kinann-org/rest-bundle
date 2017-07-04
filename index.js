(function(exports) {
    ///////////////// class ////////////////////
    var pkg = {
        RestBundle: require("./src/rest-bundle"),
        RbSocketServer: require("./src/rb-socket-server"),
        RbServer: require("./src/rb-server"),
        ResourceMethod: require("./src/resource-method"),
    };

    module.exports = exports.RestBundle = pkg;
})(typeof exports === "object" ? exports : (exports = {}));

