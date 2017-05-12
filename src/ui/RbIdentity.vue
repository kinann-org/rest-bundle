<template>

    <g-row class="rb-component rb-identity" >
        <g-col> 
            <g-icon clickable @click='showDetail=!showDetail' >
                <span :class='"glyphicon "+(error? "glyphicon-remove text-danger" : "glyphicon-ok text-success")'></span>
            </g-icon> 
        </g-col>
        <g-header v-show="!showDetail"><code>/{{service}}</code> </g-header>
        <g-col v-show="showDetail">
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
        </g-col>
    </g-row>

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
        methods: {
            blam: function(v) {
                console.log("BLAM",v);
            },
        }
    }

</script><style>

</style>

