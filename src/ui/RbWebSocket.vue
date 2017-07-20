<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Displays web socket connection status. Refreshing page after lost connection
            will restore connecdtion if server is active. 
            Clicking icon opens Server Settings dialog.
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <div class='rbws-example' v-if="about">
        <v-btn v-if="rbConnected" :class="rbwsBtnClass" icon large hover 
            @click.stop="apiEdit()">
            <v-icon :class="rbwsBtnClass" small>settings_ethernet</v-icon>
        </v-btn>
        <v-btn v-if="!rbConnected"
            class="red darken-4 white--text headline" icon large hover 
            @click.stop="apiEdit()">&#x26a0;</v-btn>
    </div>
    <div class="rbws-container" v-if="!about">
        <v-btn v-if="rbConnected" :class="rbwsBtnClass" icon large hover 
            @click.stop="apiEdit()">
            <v-icon :class="rbwsBtnClass" small>settings_ethernet</v-icon>
        </v-btn>
        <v-btn v-if="!rbConnected"
            class="red darken-4 white--text headline" icon large hover 
            @click.stop="apiEdit()">&#x26a0;</v-btn>
    </div>
    <rb-api-dialog :apiSvc='this'>
        <span slot="title">Server Settings</span>
        <v-layout>
            <v-flex xs3 class="body-2">Messages received</v-flex>
            <v-flex>{{pushCount}} </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs3 class="body-2">Push interval</v-flex>
            <v-flex>
                <v-text-field name="name_pushStateMillis" id="id_pushStateMillis"
                    v-model='apiModel.pushStateMillis' :rules="[apiRules.required, apiRules.gt0]"
                    label="Milliseconds" >
                </v-text-field>
            </v-flex>
        </v-layout>
    </rb-api-dialog>
</div>

</template>
<script>
const Vue = require("vue").default;
import RbApiDialog from './RbApiDialog.vue';

export default {
    name: "RbWebSocket",
    props: {
        model: {
            type: String,
            default: "web-socket",
            validator: (value) => value === "web-socket", // immutable
        },
        service: {
            type: String,
            default: "RbServer",
            validator: (value) => value === "RbServer", // immutable
        },
    },
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
        require("./mixins/rb-api-mixin.js"),
    ],
    methods: {
        wsOnMessage(event) {
            var ed = JSON.parse(event.data);
            if (ed.type === 'state') {
                var state = ed.data;
                Object.keys(state).forEach((service) => {
                    var serviceModule = this.$store._modules.get(["restBundle", service]);
                    var context = serviceModule && serviceModule.context;
                    context && context.commit("update", state[service]);
                });
            } else {
                console.warn("Ignoring web socket message:", ed);
            }
        },
    },
    computed: {
        rbwsBtnClass() {
            var c = '';
            if (this.rbConnected) {
                c += 'grey darken-4 green--text'
                c += (this.pushCount % 2) ? ' text--darken-1' : ' text--lighten-2';
            } else {
                c += 'red white--text';
            }
            return c;
        },
    },
    data() {
        return {
            webSocket: this.webSocket,
            apiRules: {
                required: (value) => !!value || 'Required',
                gt0: (value) => Number(value) > 0 || 'Positive number',
            },
        }
    },
    created() {
        try {
            var wsurl = this.restOrigin().replace(/[^:]*/, 'ws');
            this.webSocket = new WebSocket(wsurl);
            this.webSocket.onmessage = this.wsOnMessage;
            this.webSocket.onopen = (event) => {
                this.rbCommit({
                    rbConnected: true,
                });
            }
            this.webSocket.onclose = (event) => {
                this.rbCommit({
                    rbConnected: false,
                });
            }
        } catch (err) {
            console.log("Could not open web socket", err);
        }
    },
    beforeMount() {
        this.apiLoad();
    },
    components: {
        RbApiDialog,
    }
}

</script>
<style> 
.form-table th {
    vertical-align: top;
    text-align: left;
    padding-right: 1em;
}
.form-table td {
    vertical-align: top;
    padding-bottom: 3pt;
}
</style>

