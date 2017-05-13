(function(exports) {
    ///////////////// class ////////////////////
    var pkg = {
        RestBundle: require("./src/rest-bundle"),
        ResourceMethod: require("./src/resource-method"),
        vue: require("./src/ui/plugin.js"),
    };

    module.exports = exports.RestBundle = pkg;
})(typeof exports === "object" ? exports : (exports = {}));

