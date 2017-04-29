const RestBundle = require("../src/rest-bundle");
const ResourceMethod = require("../src/resource-method");

(function(exports) {

    class MockResponse {
        constructor(status = 200) {
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
            this.test_use = {};
            this.count_next = 0;
            this.testConfig = {};
        }
        set(name, value) {
            this.testConfig[name] = value;
        }
        get(path, cb) {
            this.testGET[path] = cb;
        }
        post(path, cb) {
            this.testPOST[path] = cb;
        }
        use(path, express) {
            this.test_use[path] = express;
        }
        mockGET(path, cb) {
            var that = this;
            var req = {};
            var res = new MockResponse();

            function next() {
                that.count_next++;
            }
            var handler = this.testGET[path];
            if (handler == null) {
                cb(new MockResponse(404));
            } else {
                handler(req, res, next).then((data) => cb(res), (err) => cb(res));
            }
        }
        mockPOST(path, data, cb) {
            var that = this;
            var req = {
                data: data,
            };
            var res = new MockResponse();

            function next() {
                that.count_next++;
            }
            var handler = this.testPOST[path];
            if (handler == null) {
                cb(new MockResponse(404));
            } else {
                handler(req, res, next).then((data) => cb(res), (err) => cb(res));
            }
        }
    }

    module.exports = exports.MockExpress = MockExpress;
})(typeof exports === "object" ? exports : (exports = {}));
