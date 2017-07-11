<template>

<div>
    <rb-about v-if="about" :name="componentName">
        <p> Display status for a collection of services: 
            <ul>
                <li><b>Service Identity</b> is provided by <code>GET /SERVICE/identity</code>, 
                    which also serves as a simple way to determine service availability.
                </li>
                <li><b>Client State</b> is stored in the Vuex Store singleton. Each service reports its own state for telemetry
                    via <code>GET /SERVICE/state</code>.
                </li>
            </ul>
        </p>
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="services" value='["test","badService"]' slot="prop">Array of service names</rb-about-item>
    </rb-about>
    <div>
        <h6>Service Identities
            <v-btn icon dark small flat class="btn--dark-flat-focused" :loading="loading!==0"
                 @click.native="updateIdentities()"
                 :disabled="loading!==0" ><v-icon>refresh</v-icon></v-btn>
        </h6>
        <p>
        <template v-for='service of services' >
            <rb-identity :service="service"></rb-identity>
        </template>
        </p>

        <h6>Client State
            <v-btn icon dark small flat class="btn--dark-flat-focused" :loading="loading!==0"
                 @click.native="updateState()"
                 :disabled="loading!==0" ><v-icon>refresh</v-icon></v-btn>
        </h6>
        <rb-state></rb-state>
    </div>
</div>

</template>
<script>

export default {
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
    ],
    props: {
        services: {
            default: () => ["test", "badService"],
        },
    },
    data() {
        return {
            state: this.$store.state,
            loading: 0,
        }
    },
    methods: {
        updateIdentities() {
            var results = this.services.map(service =>  {
                this.loading++;
                return this.$store.dispatch(["restBundle", service, "identity", "apiLoad"].join("/"))
                .then(res => setTimeout(() => this.loading--, 500))
                .catch(err => setTimeout(() => this.loading--, 500));
            });
        },
        updateState() {
            var results = this.services.map(service =>  {
                this.loading++;
                return this.$store.dispatch(["restBundle", service, "getState"].join("/"))
                .then(res => setTimeout(() => this.loading--, 500))
                .catch(err => setTimeout(() => this.loading--, 500));
            });
        },
    },
}

</script>
<style></style>
