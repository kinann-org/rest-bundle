<template>

<div>
    <rb-about v-if="about" :name="componentName">
        <p> Displays contents of the client <b>rest-bundle</b> Vuex Store in a TreeView. Normally used in a developer app.
            RestBundle Vue components that use the RbService mixin will automatically create service state object:
            <br>
        </p>
        <p> <code>mixins: [ require("rest-bundle").vue/RbService) ]</code>
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <v-expansion-panel class="grey lighten-2 " >
      <v-expansion-panel-content>
        <div slot="header" class="title " >
            <div class="rb-panel-icon" >
                <v-icon xsmall class="" >visibilityk</v-icon>
            </div>
            <div class="rb-panel-header">RestBundle Client State</div>
        </div>
        <v-card class="grey lighten-4"><v-card-text>
        <tree-view root-key="this.$store.state.restBundle" initial-depth="1" class="mt-1 ml-1" :data="rootState"></tree-view>
        </v-card-text> </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
</div>

</template>
<script>

var TreeView = require('./TreeView.vue');

export default {
    mixins: [ 
        require("./mixins/rb-about.js"),
    ],
    methods: {
        rootState() {
            return this.$store.state.restBundle;
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
        TreeView,
    },
}

</script>
<style> </style>

