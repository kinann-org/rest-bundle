const Vue = require("vue").default;
const axios = require("axios");
const debug = process.env.NODE_ENV !== 'production'

function update(state, payload={}) {
    Object.keys(payload).forEach(key => Vue.set(state, key, payload[key]));
}

module.exports = {
    props: {
        service: {
            type: String,
            default: "test",
        }
    },
    methods: {
        origin() {
            return debug ? "http://localhost:8080" : location.origin;
        },
        actions(a) { // default Component-scoped Vuex Module actions
            return a;
        },
        mutations(m) { // default Component-scoped Vuex Module actions
            return m;
        },
        wsOnMessage(event) {
            var ed = JSON.parse(event.data);
            if (ed.type === 'state') {
                var state = ed.data;
                Object.keys(state).forEach((service) => {
                    var serviceModule = this.$store._modules.get(["restBundle", service]);
                    var context = serviceModule && serviceModule.context;
                    context && context.commit("update", state[service]);
                });
            } else {
                console.warn("Ignoring web socket message:", ed);
            }
        },
        httpGet(context, url) {
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
                }).catch( err => {
                    var msg = url + " ";
                    if (err.response) {
                        var res = err.response;
                        msg +=  " \u2794 HTTP" + res.status;
                    } else {
                        msg +=  " \u2794 " + err;
                    }
                    setTimeout(() => context.commit('update', {
                        httpStatus: msg,
                    }), 500);
                    reject(new Error(msg, err));
                });
            });
        },
        restBundleModel(state) {
            var that = this;
            var rbService = that.restBundleService();
            if (rbService[that.model] == null) {
                var mutations = that.mutations({ update });
                var actions = that.actions({
                    getUpdate(context, payload) {
                        var url = that.origin() + "/" + that.service + "/" + that.model;
                        return that.httpGet(context, url);
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
        restBundleDispatch(mutation, payload, model=this.model, service=this.service) {
            this.$store.dispatch(["restBundle", service, model, "getUpdate"].join("/"), payload);
        },
        restBundleService(service=this && this.service) {
            var that = this;
            var restBundle = this.$store.state.restBundle;
            if (restBundle == null) {
                this.$store.registerModule(["restBundle"], {
                    namespaced: true,
                    state: {},
                });
                restBundle = this.$store.state.restBundle;
                try {
                    var wsurl = "ws://localhost:8080";
                    console.log("creating WebSocket", wsurl);
                    var ws = new WebSocket(wsurl);
                    ws.onmessage = that.wsOnMessage;
                } catch (err) {
                    console.log("Could not open web socket", err);
                }
            }
            if (restBundle[service] == null) {
                var servicePath = ["restBundle", service];
                this.$store.registerModule(servicePath, {
                    namespaced: true,
                    state: {},
                    mutations: { update },
                    actions: {
                        getState(context, payload) {
                            var url = that.origin() + "/" + that.service + "/state";
                            return that.httpGet(context, url);
                        },
                    }
                });
            }
            return restBundle[service];
        },
    },
    computed: {
        httpStatus() {
            return this.rbModel.httpStatus;
        },
        rbModel() {
            return this.restBundleModel();
        },
    },
}
