<template>

<div>
    <template v-if="about">
        <h4>RbServices <code>&lt;rb-services&gt;</code></h4>
        <p> Display status for a collection of services
        </p>
        <v-container fluid>
            <v-layout>
                <v-flex xs3><b>Property</b></v-flex>
                <v-flex xs3><b>Default</b></v-flex>
                <v-flex xs8><b>Description</b></v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3><code>about</code></v-flex>
                <v-flex xs3>false</v-flex>
                <v-flex xs8>Show this descriptive text</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3><code>services</code></v-flex>
                <v-flex xs3>["test","badService"]</v-flex>
                <v-flex xs8>Array of service names</v-flex>
            </v-layout>
        </v-container>
        <v-subheader>Example</v-subheader>
        <v-divider/>
    </template>
    <div>
        <h6>Service Status
            <v-btn icon dark small flat class="btn--dark-flat-focused" :loading="loading!==0"
                 @click.native="update()"
                 :disabled="loading!==0" ><v-icon>refresh</v-icon></v-btn>
        </h6>
        <p>
        <template v-for='service of services' >
            <rb-identity :service="service"></rb-identity>
        </template>
        </p>

        <h6>Client State</h6>
        <p> RestBundles share client state using the Vuex Store singleton.
        </p>
        <v-card flat hover v-tooltip:bottom='{html:"<rb-state>"}' class="mb-4">
            <rb-state></rb-state>
        </v-card>

        <v-alert error :value="error">{{error}}</v-alert>
    </div>
</div>

</template>
<script>

import RbIdentity from './RbIdentity.vue';
import RbState from './RbState.vue';

export default {
    props: {
        about: {
            default: false,
        },
        services: {
            default: () => ["test", "badService"],
        },
    },
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
        update() {
            this.error = "";
            var results = this.services.map(service =>  {
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
