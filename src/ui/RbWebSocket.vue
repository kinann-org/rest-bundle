<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Displays web socket connection status. Refreshing page after lost connection
            will restore connecdtion if server is active.
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <div class='rbws-example' v-if="about">
        <v-btn :class="rbwsBtnClass" icon large hover 
            @click.native.stop="openDialog()">
            <v-icon v-if="isConnected" :class="rbwsBtnClass" large>http</v-icon>
            <v-icon v-if="!isConnected" x-large>error</v-icon>
        </v-btn>
    </div>
    <div class="rbws-container" v-if="!about">
        <v-btn :class="rbwsBtnClass" icon large hover 
            @click.native.stop="openDialog()">
            <v-icon v-if="isConnected" :class="rbwsBtnClass" large>http</v-icon>
            <v-icon v-if="!isConnected" x-large>error</v-icon>
        </v-btn>
        <v-toolbar v-if="!isConnected"
            class="red" style='position:fixed; bottom:0px; right:0px; left: 0px;'>
            <v-icon x-large dark>error</v-icon>
            <v-toolbar-title class="white--text">
                Connection lost
            </v-toolbar-title>
            <v-spacer/>
            <v-btn fab dark small flat class="red" 
                @click.native.stop="reload()" >
                <v-icon dark>refresh</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
    <v-dialog v-model="dialog" lazy absolute>
      <v-card>
        <v-card-title >messages: {{pushCount}}</v-card-title>
        <v-card-text v-if="isConnected">
            <v-text-field name="name_pushStateMillis" id="id_pushStateMillis"
                label="pushStateMillis" ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" 
            v-if="!isConnected"
            @click.native="reload()">Refresh</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Done</v-btn>
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
        methods: {
            serviceLink(path) {
                var host = location.port === "4000" 
                    ? location.hostname + ":8080"
                    : location.host;
                return "http://" + host + "/" + this.service + path;
            },
            toggleDetail() {
                var srb = this.restBundleService('RbServer');
                var rbws = srb && srb['web-socket'];
                rbws && Vue.set(rbws, 'showDetail',  !rbws.showDetail);
            },
            reload() {
                window.location.reload();
            },
            openDialog() {
                this.dialog = true;
            },
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
        mixins: [ 
            require("./mixins/rb-about-mixin.js"),
            require("./mixins/rb-service-mixin.js"),
        ],
        computed: {
            showDetail() {
                var srb = this.restBundleService('RbServer');
                var rbws = srb && srb['web-socket'];
                return rbws && rbws.showDetail;
            },
            rbwsIconClass() {
                var c = 'rbws-icon ';
                c += this.showDetail || !this.isConnected ? 'rbws-icon-detail ' : 'rbws-icon-terse ';
                if (this.isConnected) {
                    c += (this.pushCount % 2) ? 'rbws-icon-active0' : 'rbws-icon-active1';
                } else {
                    c += 'rbws-icon-dead';
                }
                return c;
            },
            rbwsBtnClass() {
                var c = '';
                if (this.isConnected) {
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
                isConnected: null,
                dialog: false,
                hover: false,
            }
        },
        created() {
            var srb = this.restBundleService('RbServer');
            var rbws = srb && srb['web-socket'];
            rbws && rbws.showDetail == null && Vue.set(rbws, "showDetail", false);
            try {
                var wsurl = this.restOrigin().replace(/[^:]*/, 'ws');
                console.log("creating WebSocket", wsurl);
                this.webSocket = new WebSocket(wsurl);
                this.webSocket.onmessage = this.wsOnMessage;
                this.webSocket.onclose = (event) => Vue.set(this, 'isConnected', false);
                this.webSocket.onopen = (event) => Vue.set(this, 'isConnected', true);
            } catch (err) {
                console.log("Could not open web socket", err);
            }
        },
        beforeMount() {
            this.restBundleDispatch("loadComponentModel");
        },
    }

</script>
<style> 
.rbws-container {
    position: relative;
}
.rbws-example {
    display: flex;
    z-index: 99999;
}
.rbws-icon {
    border-bottom-left-radius: 1em;
    height: 1em;
    width: 1em;
}
.rbws-icon:hover {
    cursor: pointer;
}
.rbws-icon-terse {
}
.rbws-icon-detail {
    border-bottom-left-radius: 0.5em;
    height: 3.8em;
}
.rbws-icon-active0 {
    background-color: rgba(35,155,86,1);
}
.rbws-icon-active1 {
    background-color: rgba(35,155,86,0.8);
}
.rbws-icon-dead {
    background-color: rgba(255,0,0,1);
}
.rbws-no-connection {
    width: 10em;
    color: #fff;
    font-weight: 700;
    background-color: rgba(255,0,0,1);
    padding-top: 0.25em;
    padding-left: 0.5em;
    padding-right: 0.5em;
}
.rbws-text {
    padding-top: 0.25em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    background-color: #ddd;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
</style>

