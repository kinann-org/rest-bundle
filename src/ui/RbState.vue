<template>

<v-expansion-panel class="grey lighten-2 " >
  <v-expansion-panel-content>
    <div slot="header" class="title grey--text text--darken-1" >
        <div class="rb-panel-header">rb-state</div>
    </div>
    <v-card class="grey lighten-4"><v-card-text>
    <tree-view max-depth="1" class="mt-1 ml-1" :data="restBundleServices"></tree-view>
    </v-card-text> </v-card>
  </v-expansion-panel-content>
</v-expansion-panel>


</template>
<script>

var TreeView = require('./TreeView.vue');

export default {
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

</script><style>

</style>

