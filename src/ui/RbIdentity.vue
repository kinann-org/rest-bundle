<template>

<v-expansion-panel >
  <v-expansion-panel-content>
    <div slot="header" class="title " >
        <div class="rb-panel-icon" >
            <v-icon v-show="error" small class="error--text " >error</v-icon>
            <v-icon v-show="!error" xsmall class="success--text " >check</v-icon>
        </div>
        <div class="rb-panel-header" >Service Identity: /{{service}}</div>
    </div>
    <v-card flat hover >
        <v-card-text class="pl-5 ml-1">
                <v-layout row>
                    <v-flex xs2><b>Component:</b></v-flex>
                    <v-flex xs9><code>&lt;{{componentTag}}&gt;</code> _uid:{{_uid}} </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>Description:</b></v-flex>
                    <v-flex xs9> 
                        <slot>Identification for RestBundle service "{{service}}" </slot>
                    </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>Status:</b></v-flex>
                    <v-flex xs9> 
                        <a :href="origin()+'/'+service+'/identity'" target="_blank">/{{service}}/identity</a> 
                            <span class="text-danger">{{error || "(OK)"}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>Package:</b></v-flex>
                    <v-flex xs9> {{package}}@{{version}} </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>Model:</b></v-flex>
                    <v-flex xs9> {{model}} </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>Home Page:</b></v-flex>
                    <v-flex xs9> <a :href='serviceLink("/ui")' target="_blank">{{serviceLink("/ui")}}</a> </v-flex>
                </v-layout>
        </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</v-expansion-panel>

</template>
<script>

    import Vue from 'vue';
    const debug = process.env.NODE_ENV !== 'production';

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
                return this.rbModel.package;
            },
            version() { 
                return this.rbModel.version;
            },
        },
        data() {
            this.restBundleModel({
                name: this.service,
                package: null,
                version: null,
            });
            return {
                showDetail: false,
            }
        },
        created() {
            this.restBundleDispatch("getUpdate");
        },
        methods: {
            serviceLink(path) {
                var host = location.port === "4000" 
                    ? location.hostname + ":8080"
                    : location.host;
                return "http://" + host + "/" + this.service + path;
            },
        },
        beforeMount() {
        }
    }

</script>
<style> </style>

