<template>

<v-expansion-panel class="grey lighten-2 " >
  <v-expansion-panel-content>
    <div slot="header" class="title grey--text text--darken-1" >
        <div style="position:absolute; top:0.35em;left:0.5em">
            <v-icon v-show="error" small class="red--text text--darken-1 " >error</v-icon>
            <v-icon v-show="!error" xsmall class="green--text text--darken-2 " >check</v-icon>
        </div>
        <div class="rb-panel-header" >/{{service}}/identity</div>
    </div>
    <v-card> <v-card-row class="grey lighten-4"> <v-card-text>
        <g-row><g-header>Component:</g-header>
            <g-text><code>&lt;{{componentTag}}&gt;</code> _uid:{{_uid}}</g-text></g-row>
        <g-row><g-header>Description:</g-header>
            <g-text><slot>Displays identity of "{{service}}" RestBundle service</slot></g-text></g-row>
        <g-row>
            <g-header>REST:</g-header>
            <g-text><a :href="origin+'/'+service+'/identity'" target="_blank">/{{service}}/identity</a> 
                <span class="text-danger">{{error}}</span></g-text>
        </g-row>
        <g-row>
            <g-header>Home Page:</g-header>
            <g-text><a :href='"/"+service+"/ui"' target="_blank">/{{service}}/ui</a></g-text>
        </g-row>
        <g-row><g-header>Package:</g-header><g-text>{{package}}@{{version}}</g-text></g-row>
        <g-row><g-header>Model:</g-header><g-text>{{model}}</g-text></g-row>
    </v-card-text> </v-card-row> </v-card>
  </v-expansion-panel-content>
</v-expansion-panel>

</template>
<script>

    const debug = process.env.NODE_ENV !== 'production';
    const axios = require("axios");

    var grid = require('vue-g-row-col');

    export default {
        props: {
            model: {
                required: false,
                type: String,
                default: "identity",
            }
        },
        mixins: [ require("./mixins/rb-service.js") ],
        computed: {
            package() { 
                return this.modelState && this.modelState.package || "package?";
            },
            version() { 
                return this.modelState && this.modelState.version || "version?";
            },
        },
        data() {
            this.restBundleServices();
            this.$store.commit("restBundleServices/updateRestBundle", {
                service: this.service,
                model: this.model,
                name: this.service,
                package: "tbd",
                version: "tbd",
            });
            return {
                showDetail: false,
                error: "",
            }
        },
        components: Object.assign({}, grid),
        beforeMount() {
            this.origin = debug ? "http://localhost:8080" : location.origin;
            axios.get(this.origin + "/" + this.service + "/identity")
                .then((res) => {
                    var data = Object.assign({}, res.data, {
                        service: this.service,
                        model: this.model,
                    });
                    this.$store.commit("restBundleServices/updateRestBundle", data);
                })
                .catch((err) => {
                    var res = err.response;
                    this.error = " \u2794 HTTP" + res.status;
                });
        }
    }

</script><style>

.expansion-panel, .expansion-panel>li {
    border-top-left-radius: 0.4em !important;
    border-top-right-radius: 0.4em !important;
}
.expansion-panel:last-child, .expansion-panel>li {
    border-bottom-left-radius: 0.4em !important;
    border-bottom-right-radius: 0.4em !important;
}
.rb-panel-header {
    position:absolute; 
    top:0.5em;
    left:2.5em;
}



</style>

