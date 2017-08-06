const Vue = require("vue").default;
const axios = require("axios");
const debug = process.env.NODE_ENV !== 'production'

function updateObject(state, payload = {}) {
    var isObject = (v) => v != null && typeof v === 'object' && !(v instanceof Array);
    Object.keys(payload).forEach(key => {
        var value = payload[key];
        if (isObject(value) && isObject(state[key])) {
            updateObject(state[key], value);
        } else {
            Vue.set(state, key, value);
        }
    });
}

module.exports = {
    props: {
        service: {
            type: String,
            default: "test",
        }
    },
    created() {
        this.restBundleResource({
        });
    },
    methods: {
        updateObject,
        actions(a) { // default Component-scoped Vuex Module actions
            return a;
        },
        mutations(m) { // default Component-scoped Vuex Module actions
            return m;
        },
        restOrigin() {
            return debug ? "http://localhost:8080" : location.origin;
        },
        updateComponentStore(context, url) {
            var that = this;
            context.commit('update', {
                httpStatus: "http",
            });
            return new Promise((resolve, reject) => {
                that.$http.get(url).then((res) => {
                    context.commit('update', res.data);
                    setTimeout(() => context.commit('update', {
                        httpStatus: "",
                    }), 500);
                    resolve(res.data);
                }).catch(err => {
                    var msg = url + " ";
                    if (err.response) {
                        var res = err.response;
                        msg += " \u2794 HTTP" + res.status;
                    } else {
                        msg += " \u2794 " + err;
                    }
                    setTimeout(() => context.commit('update', {
                        httpStatus: msg,
                    }), 500);
                    reject(new Error(msg, err));
                });
            });
        },
        rbCommit(data, mutation='update', service=this.service, apiName=this.apiName) {
            if (!apiName) {
                apiName = "rbCommit-no-apiName";
            }
            this.$store.commit(['restBundle', service, apiName, mutation].join('/'), data);
        },
        restBundleResource(initialState) {
            // The model is the union of:
            // 1) pushed read-only state, and 
            // 2) client-mutable fields
            var that = this;
            var rbService = that.restBundleService();
            var apiName = that.apiName;
            if (!apiName) {
                apiName = "restBundleResource-no-apiName";
            }
            if (rbService[apiName] == null) {
                var mutations = that.mutations({
                    update: updateObject,
                });
                var actions = that.actions({
                    apiLoad(context, payload) {
                        var url = that.restOrigin() + "/" + that.service + "/" + apiName;
                        return that.updateComponentStore(context, url);
                    },
                });
                that.$store.registerModule(["restBundle", that.service, apiName], {
                    namespaced: true,
                    state: initialState || {},
                    actions,
                    mutations,
                });
            }
            return rbService[apiName];
        }, // restBundleResource
        rbDispatch(action, payload, apiName = this.apiName, service = this.service) {
            if (action == null) {
                throw new Error("rbDispatch() action is required");
            }
            if (!apiName) {
                apiName = "rbDispatch-no-apiName";
            }
            return this.$store.dispatch(["restBundle", service, apiName, action].join("/"), payload);
        },
        restBundleService(service = this && this.service) {
            var that = this;
            var restBundle = this.$store.state.restBundle;
            if (restBundle == null) {
                this.$store.registerModule(["restBundle"], {
                    namespaced: true,
                    state: {},
                });
                restBundle = this.$store.state.restBundle;
            }
            if (restBundle[service] == null) {
                var servicePath = ["restBundle", service];
                this.$store.registerModule(servicePath, {
                    namespaced: true,
                    state: {},
                    mutations: {
                        update: updateObject,
                    },
                    actions: {
                        getState(context, payload) {
                            var url = that.restOrigin() + "/" + that.service + "/state";
                            return that.updateComponentStore(context, url);
                        },
                    }
                });
            }
            return restBundle[service];
        },
    },
    computed: {
        rbConnected() {
            try {
                return this.$store.state.restBundle.RbServer["web-socket"].rbConnected;
            } catch (err) {
                return false;
            }
        },
        rbIcon() {
            var httpStatus = this.httpStatus;
            if (httpStatus === "http") {
                return "http";
            } else if (httpStatus == "") {
                return this.pushState % 4 == 1 ?
                    "none" :
                    (this.rbBusy ? "hourglass_empty" : "check");
            } else {
                return "error";
            }
        },
        rbTasks() {
            return this.restBundleService().tasks;
        },
        rbBusy() {
            var tasks = this.rbTasks;
            return tasks == null || tasks.length > 0;
        },
        serviceFromUrl() {
            var path = location.href.split("#")[0];
            var subpaths = path.split("/");
            console.log("subpaths", subpaths);
            return subpaths[3] || "test";
        },
        pushCount() {
            var srb = this.restBundleService('RbServer');
            var rbws = srb && srb['web-socket'];
            return rbws && rbws.pushCount;
        },
        httpStatus() {
            return this.rbResource.httpStatus;
        },
        rbResource() {
            return this.restBundleResource();
        },
        rbService() {
            return this.restBundleService();
        },
    },
};
