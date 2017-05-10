var axios = require("axios");
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    props: {
        service: {
            type: String,
            required: true,
        }
    },
    data() {
        let stateType = this.$options._componentTag + "_state";
        let data = this.$store.getters.stateData(stateType, this.service);
        if (data == null) {
            data = {
                stateName: this.service,
                stateType: stateType,
                package: "tbd",
                version: "tbd",
                error: "",
                origin: "",
            }
            this.$store.commit("registerData", data);
        }
        return data;
    },
    computed: {
        selector() {
            return this.$options._componentTag;
        },
    },
    beforeMount() {
        this.origin = debug ? "http://localhost:8080" : location.origin;
        axios.get(this.origin + "/" + this.service + "/identity")
            .then((res) => {
                var json = res.data;
                this.package = json.package || this.package;
                this.version = json.version || this.version;
            })
            .catch((err) => {
                var res = err.response;
                this.package = "(no package)";
                this.version = "(no version)";
                this.error = " \u2794 HTTP" + res.status;
            });
    }
}
