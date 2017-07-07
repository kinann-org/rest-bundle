<template>

</div>
    <v-dialog v-model="apiDialog" lazy persistent absolute width="90%">
      <v-card>
        <v-card-title >messages: {{pushCount}}</v-card-title>
        <v-card-text v-if="isConnected">
            <v-text-field name="name_pushStateMillis" id="id_pushStateMillis"
                v-model='api.pushStateMillis'
                label="pushStateMillis" ></v-text-field>
        </v-card-text>
        <v-card-text v-for="ae in apiErrors" raised hover class="subheading error-card">
            {{ae}}
        </v-card-text>
        <v-card-text v-if="!isConnected" raised hover class="subheading error-card">
            Connection lost. Refresh when server is available.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="apiCancel()">Cancel</v-btn>
          <v-btn class="green--text darken-1" flat="flat" 
            v-if="!isConnected"
            @click.native="apiRefresh()">Refresh</v-btn>
          <v-btn v-if="isConnected"
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
        name: "RbApiDialog",
        props: {
            model: {
                type: String,
                required: true,
            },
            service: {
                type: String,
                required: true,
            },
        },
        methods: {
            apiRefresh() {
                this.apiDialog = false;
                window.location.reload();
            },
            apiOpen() {
                var model = this.restBundleModel();
                this.api = Object.assign(this.api, model.api);
                this.apiDialog = true;
                this.apiErrors = [];
            },
            apiCancel() {
                this.apiDialog = false;
            },
            apiSave(api) {
                this.apiErrors = [];
                var url = this.restOrigin() + "/" + this.service + "/" + this.model;
                this.$http.put(url, { api })
                .then(res => {
                    var model = this.restBundleModel();
                    if (model) {
                        this.$store.commit(['restBundle', this.service, this.model, 'update'].join('/'), res.data);
                        this.api = res.data.api;
                        this.apiDialog = false;
                    } else {
                        throw new Error("sadness");
                    }
                })
                .catch(err => {
                    this.apiErrors.push(err);
                });
            },
        },
        mixins: [ 
            require("./mixins/rb-about-mixin.js"),
            require("./mixins/rb-service-mixin.js"),
        ],
        computed: {
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
                isConnected: null,
                apiDialog: false,
                apiErrors: [],
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
            this.rbDispatch("apiLoad")
            .then(res => {
                console.warn("apiLoad", res);
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

