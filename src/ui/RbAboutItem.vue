<template>

<div>
    <rb-about v-if="about" :name="componentName">
        <p> Displays information about a component API item
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="name" slot="prop">Property or slot name</rb-about-item>
        <rb-about-item name="slot" slot="prop">Item type: "prop" or "slot"</rb-about-item>
        <rb-about-item name="value" slot="prop">Default property value. Omit for required properties</rb-about-item>
    </rb-about>
    <v-layout>
        <v-flex xs3><code>{{name}}</code></v-flex>
        <v-flex xs3>
            <span v-if="value">{{value}}</span>
            <span v-else><i>required</i></span>
        </v-flex>
        <v-flex xs8><slot>Property description</slot></v-flex>
    </v-layout>
</div>

</template>
<script>

    export default {
        name: "RbAboutItem",
        mixins: [ require("./mixins/rb-about") ],
        props: {
            name: {
                type: String,
                default: "property-name",
            },
            value: {
                required: false,
                type: String,
            },
        },
    }

</script>
<style> </style>

