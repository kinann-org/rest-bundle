<template>

<v-expansion-panel class="grey lighten-2 " >
  <v-expansion-panel-content>
    <div slot="header" class="title grey--text text--darken-1" >
        <div style="position:absolute; top:0.35em;left:0.5em">
            <v-icon v-show="error" small class="red--text text--darken-1 " >error</v-icon>
            <v-icon v-show="!error" xsmall class="green--text text--darken-2 " >check</v-icon>
        </div>
        <div style="position: absolute; top: 0.5em; left:2.5em">/{{service}}/identity</div>
    </div>
    <v-card> <v-card-row class="grey lighten-4"> <v-card-text>
        <g-row><g-header>Service:</g-header><g-text><code>/{{service}}</code></g-text></g-row>
        <g-row><g-header>Component:</g-header>
            <g-text><code>&lt;{{selector}}&gt;</code> {{stateType}}#{{stateId}}</g-text></g-row>
        <g-row><g-header>Description:</g-header>
            <g-text><slot>Displays identity of "{{service}}" RestBundle service</slot></g-text></g-row>
        <g-row>
            <g-header>REST:</g-header>
            <g-text><a :href="origin+'/'+service+'/identity'" target="_blank">/{{service}}/identity</a> 
                <span class="text-danger">{{error}}</span></g-text>
        </g-row>
        <g-row>
            <g-header>View:</g-header>
            <g-text><a :href='"/"+service+"/ui"' target="_blank">/{{service}}/ui</a></g-text>
        </g-row>
        <g-row><g-header>Package:</g-header><g-text>{{package}}@{{version}}</g-text></g-row>
    </v-card-text> </v-card-row> </v-card>
  </v-expansion-panel-content>
</v-expansion-panel>

</template>
<script>

    var grid = require('vue-g-row-col');

    export default {
        mixins: [ require("./mixins/rb-service.js") ],
        data: function() {
            return {
                showDetail: false, 
            }
        },
        components: Object.assign({}, grid),
    }

</script><style>

.expansion-panel, .expansion-panel>li {
    border-top-left-radius: 0.4em !important;
    border-top-right-radius: 0.4em !important;
}
.expansion-panel:last-child, .expansion-panel>li {
    border-bottom-left-radius: 0.4em !important;
    border-bottom-right-radius: 0.4em !important;
}



</style>

