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
    <v-card> 
        <v-card-text>
            <v-container fluid>
                <v-row >
                    <v-col xs3><b>Component:</b></v-col>
                    <v-col xs9><code>&lt;{{componentTag}}&gt;</code> _uid:{{_uid}} </v-col>
                </v-row>
                <v-row >
                    <v-col xs3><b>Description:</b></v-col>
                    <v-col xs9> 
                        <slot>Identification for RestBundle service "{{service}}" </slot>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col xs3><b>Status:</b></v-col>
                    <v-col xs9> 
                        <a :href="origin()+'/'+service+'/identity'" target="_blank">/{{service}}/identity</a> 
                            <span class="text-danger">{{error || "(OK)"}}</span>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col xs3><b>Package:</b></v-col>
                    <v-col xs9> {{package}}@{{version}} </v-col>
                </v-row>
                <v-row >
                    <v-col xs3><b>Model:</b></v-col>
                    <v-col xs9> {{model}} </v-col>
                </v-row>
                <v-row >
                    <v-col xs3><b>Home Page:</b></v-col>
                    <v-col xs9> <a :href='serviceLink("/ui")' target="_blank">{{serviceLink("/ui")}}</a> </v-col>
                </v-row>
            </v-container>
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

