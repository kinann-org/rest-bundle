<template>

<div class="rb-component rb-identity">
    <table>
        <tr><th>Component:</th><td>&lt;{{name}}&gt; #{{instance}}</td></tr>
        <tr><th>Package:</th><td>{{package}}@{{version}}</td></tr>
        <tr><th>Description:</th><td>Displays REST response for <code>/{{service || "NO-SERVICE"}}/identity</code></td></tr>
    </table>
</div>

</template><!- ==================== --> <script>

var axios = require("axios");
var name = "rb-identity";

export default {
    name: name,
    props: {
        service: {
            type: String,
            required: true,
        }
    },
    data() {
        console.log("RbIdentity vue data", this.service);
        return {
            name: name,
            package: "tbd",
            version: "tbd",
        }
    },
    computed: {
        instance() {
            return 432;
        }
    },
    mounted() {
        console.log("rb-identity beforeMount", this.service);
        this.$store.commit("addRestBundle", { name: this.service });
        axios.get("/" + this.service + "/identity")
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

