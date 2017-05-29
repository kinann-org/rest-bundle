const Vue = require("vue").default;
const axios = require("axios");
const debug = process.env.NODE_ENV !== 'production'

const ALL_Services =  "common";
const ALL_MODELS =  "common";

module.exports = {
    props: {
        service: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
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
        restBundleModel(state) {
            var that = this;
            var rbService = that.restBundleService();
            if (rbService[that.model] == null) {
                var mutations = that.mutations({
                    update: function(state, payload={}) {
                        Object.keys(payload).forEach(key => Vue.set(state, key, payload[key]));
                    },
                });
                var actions = that.actions({
                    getUpdate(context, payload) {
                        var url = that.origin() + "/" + that.service + "/" + that.model;
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
            var restBundle = this.$store.state.restBundle;
            if (restBundle == null) {
                this.$store.registerModule(["restBundle"], {
                    namespaced: true,
                    state: {},
                });
                restBundle = this.$store.state.restBundle;
            }
            if (restBundle[service] == null) {
                this.$store.registerModule(["restBundle",service], {
                    namespaced: true,
                    state: {},
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
