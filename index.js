(function(exports) {
    ///////////////// class ////////////////////
    var pkg = {
        RestBundle: require("./src/rest-bundle"),
        ResourceMethod: require("./src/resource-method"),
        MockExpress: require("./src/mock-express"),
    };

    module.exports = exports.RestBundle = pkg;
})(typeof exports === "object" ? exports : (exports = {}));

