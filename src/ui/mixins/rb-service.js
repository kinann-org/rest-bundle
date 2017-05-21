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
        getUpdate(state) {
            var url = this.origin() + "/" + this.service + "/" + this.model;
            this.$http.get(url).then((res) => {
                var data = res.data;
                data && Object.keys(data).forEach(key => Vue.set(state, key, data[key]));
            }).catch( err => {
                this.setError(err);
            });
        },
        restBundleModel(state) {
            var rbService = this.restBundleService();
            if (rbService[this.model] == null) {
                var that = this;
                var mutations = this.mutations();
                Object.keys(mutations).forEach(key => {
                    var f = mutations[key];
                    mutations[key] = function(state) {
                        return f.call(that, state);
                    };
                });
                this.$store.registerModule(["restBundle", this.service, this.model], {
                    namespaced: true,
                    state: state || {},
                    mutations,
                });
            }
            return rbService[this.model];
        },
        restBundleCommit(mutation, payload, model=this.model, service=this.service) {
            this.$store.commit(["restBundle", service, model, mutation].join("/"), payload);
        },
        setError(err) {
            if (err.response) {
                var res = err.response;
                this.error = " \u2794 HTTP" + res.status;
            } else {
                this.error = " \u2794 " + err;
            }
        },
        restBundleService(service=this.service) {
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
        rbModel() {
            return this.restBundleModel();
        },
        componentTag() {
            return this.$options._componentTag;
        },
    },
}
