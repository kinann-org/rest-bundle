<template>
    <div class="rb-component rb-identity">
        <table>
            <tr><th>Component:</th><td>&lt;{{name}}&gt; #{{instance}}</td></tr>
            <tr><th>Package:</th><td>{{package}}@{{version}}</td></tr>
            <tr><th>Description:</th><td>Displays REST response for <code>/{{service || "NO-SERVICE"}}/identity</code></td></tr>
        </table>
    </div>
</template>

<script>
    var axios = require("axios");

    console.log("RbIdentity loaded");

    var RbIdenity_instances = 0;
    module.exports = class RbIdentity { 
        constructor(service) {
            this.instance = ++RbIdentity_instances;
            this.name = 'rb-identity'; 
            this.package = "(package?)";
            this.version = "(version?)";
            this.service = service || "(service?)";
        }
        onCreated() {
            var that = this;
            axios.get("/" + that.service + "/identity")
                .then((res) => {
                    var json = res.json();
                    that.package = json.package || that.package;
                    that.version = json.version || that.version;
                })
                .catch((err) => console.log("err", err));
        }
    }//class

    Vue.component('rb-identity', {
    });
</script>
