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
        componentTag() {
            return this.$options._componentTag;
        },
    },
}
