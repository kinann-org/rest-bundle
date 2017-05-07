<template>

<div class="rb-component rb-identity">
    <table>
        <tr><th>Component:</th><td>&lt;{{selector}}&gt; {{stateType}}#{{stateId}}</td></tr>
        <tr><th>Package:</th><td>{{package}}@{{version}}</td></tr>
        <tr><th>Description:</th><td>Displays REST response for <code>/{{service || "NO-SERVICE"}}/identity</code></td></tr>
    </table>
</div>

</template><!- ==================== --> <script>

var axios = require("axios");
const debug = process.env.NODE_ENV !== 'production'

export default {
    props: {
        service: {
            type: String,
            required: true,
        }
    },
    computed: {
        selector() {
            return this.$options._componentTag;
        },
    },
    data() {
        var data = {
            stateName: this.service,
            stateType: this.$options._componentTag + "_state",
            package: "tbd",
            version: "tbd",
        }
        this.$store.commit("registerData", data);
        return data;
    },
    beforeMount() {
        var origin = debug ? "http://localhost:8080" : location.href;
        axios.get(origin + "/" + this.service + "/identity")
            .then((res) => {
                var json = res.data;
                this.package = json.package || this.package;
                this.version = json.version || this.version;
            })
            .catch((err) => {
                console.log("err", err);
                this.package = err.message;
                this.version = err.message;
            });
    }
}

</script><!-- ================= --><style>

.rb-component {
    border: 1pt solid #888;
    background-color: #eee;
    margin: 0.1em;
}

</style>

