<template>

<div>
    <h6>Launching RestBundles</h6>
    <p>
    RestBundles are
    <a href="https://github.com/firepick/rest-bundle/blob/master/scripts/server.js" target="_blank"
        >instantiated when launching Nodejs.</a>
    The AllServices.vue page expects three RestBundle instances ("test", "greeting" and "aloha").
    Let's use the a bash script to launch two RestBundle instances
    and see what happens:

       <kbd>scripts/rest-bundle test aloha</code></kbd>
    </p>
    <p>
        Launch a browser and look at <a href="http://localhost:4000/">http://localhost:4000</a>.
    </p>

    <h6>Service Identity
        <v-btn dark flat class="btn--dark-flat-focused" :loading="loading!==0"
             @click.native="update()"
             :disabled="loading!==0" ><v-icon>refresh</v-icon></v-btn>
    </h6>
    <p> All RestBundles provide an <code>/identity</code> service that returns information about
        the RestBundle. The Vue component for the identity service is <code>&lt;rb-identity&gt;</code>.
        The display will change according to how the services are launched. Here are 
        the three Vue components for our three services:
    </p>

    <v-card flat hover v-tooltip:bottom='{html:"<rb-identify>"}' class="mb-2">
        <template v-for='service of ["test","greeting","aloha"]' >
            <rb-identity :service="service"></rb-identity>
        </template>
    </v-card>

    <p>
    Notice that we never started the "greeting" RestBundle, and we therefore
    see a red <v-icon small class="red--text text--darken-1" >error</v-icon>
    </p>

    <h6>RestBundle Client State</h6>
    <p> All RestBundle services maintain client state in the shared Vuex Store globally
        referenced as <code>$store.state.restBundle</code> on the root Vue instance.
        The <code>&lt;rb-state&gt;</code> Vue component provides a development snapshot
        of the shared RestBundle state.
    </p>
    <v-card flat hover v-tooltip:bottom='{html:"<rb-state>"}' class="mb-20">
        <rb-state></rb-state>
    </v-card>
    <v-alert error :value="error">{{error}}</v-alert>
</div>

</template>
<script>

import RbIdentity from './RbIdentity.vue';
import RbState from './RbState.vue';

export default {
    name: 'dev',
    data() {
        return {
            state: this.$store.state,
            loading: 0,
            error: "",
        }
    },
    components: {
        RbIdentity,
        RbState,
    },
    methods: {
        urlService() {
            var subpath = location.href.split("/");
            return subpath[3] || "test";
        },
        update() {
            this.error = "";
            var results = ["test","greeting","aloha"].map(service =>  {
                this.loading++;
                return this.$store.dispatch(
                    ["restBundle", service, "identity", "getUpdate"].join("/"))
            });
            setTimeout(() => {
                results.forEach(result => {
                    if (result && typeof result.then == 'function') {
                        result.then(() => {
                            this.loading--;
                        }).catch(err => {
                            this.loading--;
                            this.error = err;
                        });
                    } else {
                        this.loading--;
                        this.error = "Could not update";
                    }
                });
            }, 500);
        },
    },
}

</script>
<style></style>
