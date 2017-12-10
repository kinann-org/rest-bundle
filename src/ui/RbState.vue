<template>

<div>
    <rb-about v-if="about" :name="componentName">
        <p> Displays the entire <b>rest-bundle</b> sub-tree of the client application Vuex Store in a TreeView. 
            Normally used in a developer app, `RbState` displays:
            <ol>
                <li>RestBundle services are listed by name. The "RbServer" service is the RbServer server singleton.</li>
                <li>Service models are listed underneath each named service. A service model comprises read-only 
                    pushState properties as well as client-mutable properties</li>
            </ol>
        </p>
        <p> <code>mixins: [ require("rest-bundle").vue/RbService) ]</code>
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <v-card class="grey lighten-4">
        <v-card-text>
            <div class="title">RestBundle Client State</div>
            <rb-tree-view root-key="this.$store.state.restBundle" 
                initial-depth="1" 
                class="mt-1 ml-1" 
                :data="rootState"></rb-tree-view>
        </v-card-text> 
    </v-card>
</div>

</template>
<script>

var RbTreeView = require('./RbTreeView.vue');

export default {
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
        require("./mixins/rb-api-mixin.js").createMixin("web-socket"),
    ],
    methods: {
        rootState() {
            return this.$store.state.restBundle;
        },
    },
    props: {
        service: { // override mixin with immutable property
            default: "RbServer",
            validator: (value) => value === "RbServer", 
        },
    },
    data() {
        return {
            nav3: false,
            short: false,
        }
    },
    computed: {
        restBundleServices() {
            return this.$store.state.restBundleServices;
        },
    },
    components: {
        RbTreeView,
    },
}

</script>
<style> </style>

