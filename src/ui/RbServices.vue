<template>

<div>
    <rb-about v-if="about" :name="componentName">
        <p> Display status for a collection of services
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="services" value='["test","badService"]' slot="prop">Array of service names</rb-about-item>
    </rb-about>
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
        update() {
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
