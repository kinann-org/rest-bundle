(function(exports) {
    ///////////////// class ////////////////////
    var pkg = {
        RestBundle: require("./src/rest-bundle"),
        RbSingleton: require("./src/rb-singleton"),
        RbServer: require("./src/rb-server"),
        ResourceMethod: require("./src/resource-method"),
        RbHash: require("./src/rb-hash"),
        Scheduler: require("./src/scheduler"),
    };

    module.exports = exports.RestBundle = pkg;
})(typeof exports === "object" ? exports : (exports = {}));

