const RestBundle = require("../src/rest-bundle");
const ResourceMethod = require("../src/resource-method");

(function(exports) {

    class MockResponse {
        constructor(status=200) {
            this.status(status);
        }
        status(code) {
            this.statusCode = code;
        }
        type(value) {
            this.type = value;
        }
        send(data) {
            this.data = data;
        }
    }

    class MockExpress {
        constructor() {
            this.testGET = {};
            this.testPOST = {};
            this.count_next = 0;
        }
        get(path, cb) {
            this.testGET[path] = cb;
        }
        post(path, cb) {
            this.testPOST[path] = cb;
        }
        mockHttp(method, path, cb) {
            var req = {};
            var res = new MockResponse();
            var promise;
            var next = () => this.count_next++;
            var handler = null;
            method === "get" && (handler = this.testGET[path]);
            method === "post" && (handler = this.testPOST[path]);
            if (handler == null) {
                cb(new MockResponse(404));
            } else {
                handler(req,res,next).then((data) => cb(res),(err) => cb(res));
            }
        }
    }

    module.exports = exports.MockExpress = MockExpress;
})(typeof exports === "object" ? exports : (exports = {}));
