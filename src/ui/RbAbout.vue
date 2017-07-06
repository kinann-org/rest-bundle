<template>

<div> 
    <rb-about v-if="about" :name="componentName">
        <p> Displays documentation about a single file Vue component
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="default" slot="slot">Content that describes component</rb-about-item>
        <rb-about-item name="prop" slot="slot"><code>rb-about-item</code> content that describes properties</rb-about-item>
        <rb-about-item name="slot" value="--" slot="slot"><code>rb-about-item</code> content that describes slots</rb-about-item>
    </rb-about>
    <h4>{{name}} <code>&lt;{{toKebabCase(name)}}&gt;</code></h4>
    <slot>The default slot for <code>rb-about</code> displays content here</slot>

    <v-tabs grow scroll-bars v-model="active" light >
        <v-tabs-bar slot="activators" class="white">    
          <v-tabs-item :href='"#about-tab-props"' ripple >Properties</v-tabs-item>
          <v-tabs-item :href='"#about-tab-slots"' ripple v-if="$slots.slot">Slots</v-tabs-item>
          <v-tabs-slider/>
        </v-tabs-bar>
        <v-tabs-content :id='"about-tab-props"'>
          <v-card flat hover>
            <v-card-text>
                <v-layout slot="prop">
                    <v-flex xs3><b>Property</b></v-flex>
                    <v-flex xs3><b>Default</b></v-flex>
                    <v-flex xs8><b>Description</b></v-flex>
                </v-layout>
                <slot name="prop">Content provided by <a href="/#rb-about-item">RbAboutItem</a> goes here</slot>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content :id='"about-tab-slots"'>
          <v-card flat hover>
            <v-card-text>
                <v-layout slot="slot">
                    <v-flex xs3><b>Slots</b></v-flex>
                    <v-flex xs3><b>Required</b></v-flex>
                    <v-flex xs8><b>Description</b></v-flex>
                </v-layout>
                <slot name="slot">Content from "slot" slot goes here</slot>
            </v-card-text>
          </v-card>
        </v-tabs-content>
    </v-tabs>

    <div class="subheading pt-4 pb-2">Example</div>
    <v-divider/>
</div>

</template>
<script>

    export default {
        name: "RbAbout",
        mixins: [ 
            require("./mixins/rb-about-mixin.js"),
        ],
        props: {
            name: {
                default: "RbAbout",
            },
        },
        data() {
            return {
                active: "about-tab-props",
            }
        },
    }

</script>
<style> </style>

