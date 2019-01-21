<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Displays web socket connection and task status. 
            The displayed icon blinks with each web socket push.
            An hourglass is shown if the server has tasks pending and
            <code>rbTasksPending</code> is true.
            Refreshing page after lost connection
            will restore connection if server is active. 
            Clicking icon opens Server Settings dialog.
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <div class='rbws-example' v-if="about">
        <v-btn v-if="rbConnected" :class="rbwsBtnClass" icon large hover 
            @click.stop="apiEdit()">
            <v-icon v-if="!rbTasksPending" :class="rbwsBtnClass" small>settings_ethernet</v-icon>
            <v-icon v-if="rbTasksPending" :class="rbwsBtnClass" small>hourglass_empty</v-icon>
        </v-btn>
    </div>
    <div class="rbws-container" v-if="!about">
        <v-btn v-if="rbConnected" :class="rbwsBtnClass" icon large hover 
            @click.stop="apiEdit()">
            <v-icon v-if="!rbTasksPending" :class="rbwsBtnClass" small>settings_ethernet</v-icon>
            <v-icon v-if="rbTasksPending" :class="rbwsBtnClass" small>hourglass_empty</v-icon>
        </v-btn>
    </div>
    <rb-api-dialog :api-svc='apiSvc' v-if="apiModelCopy" >
        <span slot="title">RestBundle Server Settings</span>
        <rb-dialog-row >
            <div slot="label">Received</div>
            <div class="rb-dialog-row-text">{{pushCount}}</div>
        </rb-dialog-row>
        <rb-dialog-row label="Push interval">
            <v-text-field label="Milliseconds" v-model='apiModelCopy.pushStateMillis' 
                :rules="[apiRules.required, apiRules.gt0]">
            </v-text-field>
        </rb-dialog-row>
        <!--
        <rb-dialog-row label="Heap monitor">
            <v-text-field label="Interval (seconds)" v-model='apiModelCopy.heapInterval' 
                :rules="[apiRules.required, apiRules.gt0]">
            </v-text-field>
            <v-text-field label="Maximum heap" v-model='apiModelCopy.heapMax' 
                hint="Log heap statistics when heap exceeds threshold"
                :rules="[apiRules.required, apiRules.gt0]">
            </v-text-field>
        </rb-dialog-row>
        -->
    </rb-api-dialog>
    <v-dialog v-model="showRefresh" lazy persistent absolute  max-width='60%'>
        <v-card>
            <v-toolbar dark class="error">
                <v-toolbar-title >
                    &#x1F622; Lost server connection
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="subheading">
                Click <strong>Refresh</strong> when server is available.
            </v-card-text>
            <v-toolbar>
                <v-spacer/>
                <v-btn flat error
                    hover
                    @click.stop="apiRefresh()">Refresh</v-btn>
            </v-toolbar>
        </v-card>
    </v-dialog>
</div>

</template>
<script>
const Vue = require("vue").default;

export default {
    name: "RbWebSocket",
    props: {
        service: { // override mixin with immutable property
            default: "RbServer",
            validator: (value) => value === "RbServer", 
        },
    },
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
        require("./mixins/rb-api-mixin.js").createMixin("web-socket"),
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
        showRefresh() {
            return this.rbConnected === false;
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
            var wsurl = location.protocol === 'https:' 
                ? this.restOrigin().replace(/[^:]*/, 'wss')
                : this.restOrigin().replace(/[^:]*/, 'ws');
            console.log(`connecting WebSocket ${wsurl}`);
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
            var msg = "Could not open web socket";
            this.alertError(msg);
            console.log(msg, err);
        }
    },
    beforeMount() {
        this.apiLoad();
    },
    components: {
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

