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
            error: "",
        }
    },
    methods: {
        origin() {
            return debug ? "http://localhost:8080" : location.origin;
        },
        restCatcher(err) {
            if (err.response) {
                var res = err.response;
                this.error = " \u2794 HTTP" + res.status;
            } else {
                this.error = " \u2794 " + err;
            }
        },
        commit(data, model = this.model, service = this.service) { 
            var services = this.restBundleServices();
            var stateData = Object.assign({}, data, {
                service: service,
                model: model,
            });
            this.$store.commit("restBundleServices/updateRestBundle", stateData);
        },
        restBundleService(service, model) {
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
                    state: { },
                    mutations: {
                    },
                });
            }
            return restBundle[service];
        },
        restBundleServices() {
            if (this.$store.state.restBundleServices == null) {
                //console.log("registerModule(restBundleServices)");
                this.$store.registerModule("restBundleServices", {
                    namespaced: true,
                    state: { },
                    mutations: {
                        updateRestBundle: function(state, data) {
                            var serviceName = data.service || ALL_SERVICES;
                            var model = data.model || ALL_MODELS;
                            var service = state[serviceName] || Vue.set(state, serviceName, {});
                            var modelData = service[model] || Vue.set(service, model, {});
                            Object.keys(data).forEach(key => {
                                if (key === "service") {
                                    // omit
                                } else if (key === "model") {
                                    // omit
                                } else {
                                    Vue.set(modelData, key, data[key]);
                                }
                            });
                        },
                    },
                });
            }
            return this.$store.state.restBundleServices;
        },
    },
    computed: {
        serviceState() {
            var serviceName = this.service || ALL_SERVICES;
            var services = this.$store.state.restBundleServices;
            return services && services[serviceName];
        },
        modelState() {
            return this.serviceState && this.serviceState[this.model];
        },
        componentTag() {
            return this.$options._componentTag;
        },
    },
}
