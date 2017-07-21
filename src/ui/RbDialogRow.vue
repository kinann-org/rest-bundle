<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Dialog row for <code>rb-api-dialog</code>
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="label" value="(label?)" slot="prop">Row label</rb-about-item>
        <rb-about-item name="default" value="required" slot="slot">Dialog fields bound to apiSvc.apiModel fields</rb-about-item>
    </rb-about>
    <v-layout row wrap>
        <v-flex xs3 class="rb-dialog-row-label">
            <v-subheader ><slot name="label">{{label}}</slot></v-subheader>
        </v-flex>
        <v-flex >
            <slot></slot>
        </v-flex>
    </v-layout>
</div>

</template>
<script>
const Vue = require("vue").default;

export default {
    name: "RbDialogRow",
    props: {
        label: {
            default: "(label?)",
        },
    },
    methods: {
    },
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
    ],
    computed: {
    },
    data() {
        return {
        }
    },
}

</script>
<style> 
.rb-dialog-row-label {
    margin-top: 0.6em;
}
.rb-dialog-row-text {
    margin-top: 1.6em;
}
</style>

