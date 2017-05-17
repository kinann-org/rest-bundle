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
    methods: {
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
