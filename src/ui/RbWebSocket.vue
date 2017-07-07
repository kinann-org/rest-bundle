<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Displays web socket connection status. Refreshing page after lost connection
            will restore connecdtion if server is active. 
            Clicking icon opens configuration dialog.
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <div class='rbws-example' v-if="about">
        <v-btn v-if="rbConnected" :class="rbwsBtnClass" icon large hover 
            @click.native.stop="apiOpen()">
            <v-icon :class="rbwsBtnClass" large>http</v-icon>
        </v-btn>
        <v-btn v-if="!rbConnected"
            class="red darken-4 white--text headline" icon large hover 
            @click.native.stop="apiOpen()">&#x26a0;</v-btn>
    </div>
    <div class="rbws-container" v-if="!about">
        <v-btn v-if="rbConnected" :class="rbwsBtnClass" icon large hover 
            @click.native.stop="apiOpen()">
            <v-icon :class="rbwsBtnClass" large>http</v-icon>
        </v-btn>
        <v-btn v-if="!rbConnected"
            class="red darken-4 white--text headline" icon large hover 
            @click.native.stop="apiOpen()">&#x26a0;</v-btn>
    </div>
    <v-dialog v-model="apiDialog" lazy persistent absolute width="90%">
      <v-card>
        <v-card-title >messages: {{pushCount}}</v-card-title>
        <v-card-text v-if="rbConnected">
            <v-text-field name="name_pushStateMillis" id="id_pushStateMillis"
                v-model='api.pushStateMillis'
                label="pushStateMillis" ></v-text-field>
        </v-card-text>
        <v-card-text v-for="ae in apiErrors" raised hover class="subheading error-card" :key='ae'>
            {{ae}}
        </v-card-text>
        <v-card-text v-if="!rbConnected" raised hover class="subheading error-card">
            Connection lost. Refresh when server is available.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="apiCancel()">Cancel</v-btn>
          <v-btn class="green--text darken-1" flat="flat" 
            v-if="!rbConnected"
            @click.native="apiRefresh()">Refresh</v-btn>
          <v-btn v-if="rbConnected"
            class="green--text darken-1" flat="flat" 
            @click.native="apiSave(api)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>

</template>
<script>

const Vue = require("vue").default;

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
            }
        },
        created() {
            var srb = this.restBundleService('RbServer');
            var rbws = srb && srb['web-socket'];
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
    }

</script>
<style> 
.error-card {
    color: white;
    background-color: #b71c1c;
    border-top: 1pt solid #fff;
    margin-left: 1em;
    margin-right: 1em;
}
.rbws-container {
    position: relative;
    padding-top: 1.5em;
}
.rbws-example {
    display: flex;
}
</style>

