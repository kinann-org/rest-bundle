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
            <v-icon v-if="isConnected" :class="rbwsBtnClass" x-large>http</v-icon>
            <v-icon v-if="!isConnected" x-large>error</v-icon>
        </v-btn>
    </div>
    <div class="rbws-container" v-if="!about">
        <v-btn :class="rbwsBtnClass" icon large hover 
            @click.native.stop="openDialog()">
            <v-icon v-if="isConnected" :class="rbwsBtnClass" large>http</v-icon>
            <v-icon v-if="!isConnected" large>error</v-icon>
        </v-btn>
    </div>
    <v-dialog v-model="dialog" lazy persistent absolute width="90%">
      <v-card>
        <v-card-title >messages: {{pushCount}}</v-card-title>
        <v-card-text v-if="isConnected">
            <v-text-field name="name_pushStateMillis" id="id_pushStateMillis"
                v-model='api.pushStateMillis'
                label="pushStateMillis" ></v-text-field>
        </v-card-text>
        <v-card style="margin: 5px">
        <v-card-text v-if="saveApiError" raised hover class="subheading error-card">
            {{saveApiError.response.data.error}}
        </v-card-text>
        <v-card-text v-if="!isConnected" raised hover class="subheading error-card">
            Connection lost. Refresh when server is available.
        </v-card-text>
        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" 
            v-if="!isConnected"
            @click.native="reload()">Refresh</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog=false">Cancel</v-btn>
          <v-btn v-if="isConnected"
            class="green--text darken-1" flat="flat" 
            @click.native="saveApi({rbhash:'nono'})">Save</v-btn>
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
                this.dialog = false;
                window.location.reload();
            },
            openDialog() {
                this.dialog = true;
                this.saveApiError = null;
            },
            saveApi(api) {
                var that = this;
                that.saveApiError = null;
                var url = that.restOrigin() + "/" + that.service + "/" + that.model;
                that.$http.put(url, { api })
                .then(res => {
                    var model = that.restBundleModel();
                    if (model) {
                        that.$store.commit(['restBundle', that.service, that.model, 'update'].join('/'), res.data);
                        that.api = res.data.api;
                        that.dialog = false;
                    } else {
                        throw new Error("sadness");
                    }
                })
                .catch(err => {
                    var data = err.response.data;
                    that.saveApiError = err;
                });
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
            rbwsBtnClass() {
                var c = '';
                if (this.isConnected) {
                    c += 'grey darken-4 green--text mt-2'
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
                saveApiError: null,
                hover: false,
                api: {
                    pushStateMillis: 'loading...',
                },
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
            this.restBundleDispatch("loadApi")
            .then(res => {
                console.warn("loadApi", res);
                this.updateObject(this.api, res.api);
            })
            .catch(err => console.error(err));
        },
    }

</script>
<style> 
.error-card {
    color: white;
    background-color: #b71c1c;
    border-top: 1pt solid #fff;
}
.rbws-container {
    position: relative;
    padding-top: 1em;
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

