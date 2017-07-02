const Vue = require("vue").default;
const axios = require("axios");
const debug = process.env.NODE_ENV !== 'production'

function updateObject(state, payload = {}) {
    var isObject = (v) => v != null && typeof v === 'object';
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
        this.restBundleModel({
            model: this.model,
        });
    },
    methods: {
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
        restBundleModel(state) {
            // The model is the union of:
            // 1) pushed read-only state, and 
            // 2) client-mutable fields
            var that = this;
            var rbService = that.restBundleService();
            if (rbService[that.model] == null) {
                var mutations = that.mutations({
                    update: updateObject,
                });
                var actions = that.actions({
                    loadComponentModel(context, payload) {
                        var url = that.restOrigin() + "/" + that.service + "/" + that.model;
                        return that.updateComponentStore(context, url);
                    },
                });
                that.$store.registerModule(["restBundle", that.service, that.model], {
                    namespaced: true,
                    state: state || {},
                    actions,
                    mutations,
                });
            }
            return rbService[that.model];
        }, // restBundleModel
        restBundleDispatch(mutation, payload, model = this.model, service = this.service) {
            this.$store.dispatch(["restBundle", service, model, "loadComponentModel"].join("/"), payload);
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
            return this.rbModel.httpStatus;
        },
        rbModel() {
            return this.restBundleModel();
        },
    },
}
