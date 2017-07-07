<template>

<div>
    <rb-about v-if="about" :name="componentName">
        <p> Displays RestBundle service information returned by <code>GET /identity</code>. In addition,
            if the server provides periodic <code>RbSocketServer.pushState()</code>, 
            the checkmark icon will pulse for connected services.
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="model" value="identity" slot="prop">RestBundle state name</rb-about-item>
        <rb-about-item name="service" slot="prop">RestBundle name</rb-about-item>
    </rb-about>
    <v-expansion-panel >
      <v-expansion-panel-content>
        <div slot="header" class="title " >
            <div class="rb-panel-icon" >
                <v-icon v-if='httpStatus==="http"' small class="warning--text " >{{rbIcon}}</v-icon>
                <v-icon v-if='httpStatus && httpStatus !== "http"' small class="error--text " >{{rbIcon}}</v-icon>
                <v-icon v-show='httpStatus==="" && (pushCount % 2) == 0' xsmall class="success--text " >{{rbIcon}}</v-icon>
                <v-icon v-show='httpStatus==="" && (pushCount % 2) != 0' xsmall class="green--text text--darken-2" >{{rbIcon}}</v-icon>
            </div>
            <div class="rb-panel-header" >Service Identity: /{{service}}</div>
        </div>
        <v-card flat >
            <v-card-text class="pl-5 ml-1">
                <v-layout row >
                    <v-flex xs2><b>Description:</b></v-flex>
                    <v-flex xs9> 
                        <slot>Identification for RestBundle service "{{service}}" </slot>
                    </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>REST&nbsp;URL:</b></v-flex>
                    <v-flex xs9> 
                        <a :href="restOrigin+'/'+service+'/identity'" target="_blank">/{{service}}/identity</a> 
                            <span class="text-danger"></span>
                    </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>REST&nbsp;status:</b></v-flex>
                    <v-flex xs9 v-if='httpStatus === "" || httpStatus ==="http"'>{{httpStatus || "OK"}}</v-flex>
                    <v-flex xs9 v-else class="error white--text" > {{httpStatus || "OK"}} </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>Package:</b></v-flex>
                    <v-flex xs9 v-if="package"> {{package}}@{{version}} </v-flex>
                    <v-flex xs9 v-else class="error white--text "> (unknown) </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs2><b>Vue:</b></v-flex>
                    <v-flex xs9><code>&lt;rb-identity&gt;</code> _uid:{{_uid}} </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>Vuex:</b></v-flex>
                    <v-flex xs9> $store.state.restBundle.{{service}}.{{model}} </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>Service&nbsp;Home:</b></v-flex>
                    <v-flex xs9> <a :href='serviceLink("/ui")' target="_blank">{{serviceLink("/ui")}}</a> </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>pushCount:</b></v-flex>
                    <v-flex xs9> {{pushCount}} </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs2><b>Tasks:</b></v-flex>
                    <v-flex xs9> {{rbTasks && rbTasks.length && rbTasks.join(",") || rbTasks && "(idle)" || "(unavailable)"}} </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
</div>

</template>
<script>

    export default {
        name: "RbIdentity",
        props: {
            model: {
                required: false,
                type: String,
                default: "identity",
            }
        },
        mixins: [ 
            require("./mixins/rb-about-mixin.js"),
            require("./mixins/rb-service-mixin.js"),
        ],
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
        beforeMount() {
            this.restBundleDispatch("loadApi");
        },
        methods: {
            serviceLink(path) {
                var host = location.port === "4000" 
                    ? location.hostname + ":8080"
                    : location.host;
                return "http://" + host + "/" + this.service + path;
            },
        },
    }

</script>
<style> </style>

