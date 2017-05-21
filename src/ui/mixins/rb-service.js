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
        actions(a) { // default Component-scoped Vueex Module actions
            return a;
        },
        mutations(m) { // default Component-scoped Vueex Module actions
            return m;
        },
        restBundleModel(state) {
            var rbService = this.restBundleService();
            if (rbService[this.model] == null) {
                var that = this;
                var mutations = this.mutations({
                    update(state, payload={}) {
                        Object.keys(payload).forEach(key => Vue.set(state, key, payload[key]));
                    },
                });
                var actions = this.actions({
                    getUpdate(context, payload) {
                        var url = this.origin() + "/" + this.service + "/" + this.model;
                        return this.$http.get(url).then((res) => {
                            context.commit('update', res.data);
                        }).catch( err => {
                            this.setError(err);
                        });
                    },
                });
                Object.keys(mutations).forEach(key => { // bind to vue component
                    var f = mutations[key];
                    mutations[key] = function(state, payload) {
                        return f.call(that, state, payload);
                    };
                });
                Object.keys(actions).forEach(key => { // bind to vue component
                    var f = actions[key];
                    actions[key] = function(context, payload) {
                        return f.call(that, context, payload);
                    };
                });
                this.$store.registerModule(["restBundle", this.service, this.model], {
                    namespaced: true,
                    state: state || {},
                    actions,
                    mutations,
                });
            }
            return rbService[this.model];
        },
        restBundleDispatch(mutation, payload, model=this.model, service=this.service) {
            this.$store.dispatch(["restBundle", this.service, this.model, "getUpdate"].join("/"), payload);
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
