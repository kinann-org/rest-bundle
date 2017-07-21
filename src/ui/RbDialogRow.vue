<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Dialog row for <code>rb-api-dialog</code>
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="label" value="(label?)" slot="prop">Row label</rb-about-item>
        <rb-about-item name="default" value="required" slot="slot">Dialog fields bound to <var>apiSvc.apiModel</var> fields</rb-about-item>
        <rb-about-item name="label" value="(optional)" slot="slot">For structured labels</rb-about-item>
        <rb-about-item name="v-layout" value="(optional)" slot="slot"><code>v-flex</code> enclosed dialog field(s) for multi-field rows</rb-about-item>
    </rb-about>
    <v-layout row wrap>
        <v-flex xs3 class="rb-dialog-row-label">
            <v-subheader ><slot name="label">{{label}}</slot></v-subheader>
        </v-flex>
        <v-flex >
            <slot>
                <div v-if="about" class="rb-dialog-row-text">Individual dialog fields go inside default slot</div>
            </slot>
        </v-flex>
        <slot name="v-layout">
            <div v-if="about" class="rb-dialog-row-text">Multiple dialog fields go inside <var>v-layout</var> slot</div>
        </slot>
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

