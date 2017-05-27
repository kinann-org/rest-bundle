<template>

<v-card flat>
    <v-card-text>
        <h4>All Services</h4>
        <p> RestBundle applications typically have a dashboard summary of the status of all services.
            For example, this application provides the  "AllServices" dashboard to track
            the status of three RestBundle services: "/test", "/greeting", and "/aloha".
        </p>

        <h6>Service Status
            <v-btn icon dark small flat class="btn--dark-flat-focused" :loading="loading!==0"
                 @click.native="update()"
                 :disabled="loading!==0" ><v-icon>refresh</v-icon></v-btn>
        </h6>
        <p>
        <v-card flat hover v-tooltip:bottom='{html:"<rb-identify>"}' class="mb-4">
            <template v-for='service of ["test","greeting","aloha"]' >
                <rb-identity :service="service"></rb-identity>
            </template>
        </v-card>
        </p>

        <h6>Client State</h6>
        <p> RestBundles share client state using the Vuex Store singleton.
        </p>
        <v-card flat hover v-tooltip:bottom='{html:"<rb-state>"}' class="mb-4">
            <rb-state></rb-state>
        </v-card>

        <v-alert error :value="error">{{error}}</v-alert>
    </v-card-text>
</v-card>

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
                return this.$store.dispatch(["restBundle", service, "identity", "getUpdate"].join("/"))
                .then(res => setTimeout(() => this.loading--, 500))
                .catch(err => setTimeout(() => this.loading--, 500));
            });
        },
    },
}

</script>
<style></style>
