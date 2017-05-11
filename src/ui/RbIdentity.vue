<template>

    <g-row class="rb-component rb-identity" >
        <g-column> 
            <g-symbol clickable @click='showDetail=!showDetail' >
                <span :class='"glyphicon "+(error? "glyphicon-remove text-danger" : "glyphicon-ok text-success")'></span>
            </g-symbol> 
        </g-column>
        <g-text v-show="!showDetail"><code>/{{service}}</code> </g-text>
        <g-column v-show="showDetail">
            <g-row><g-label>Service:</g-label><g-text><code>/{{service}}</code></g-text></g-row>
            <g-row><g-label>Component:</g-label>
                <g-text><code>&lt;{{selector}}&gt;</code> {{stateType}}#{{stateId}}</g-text></g-row>
            <g-row><g-label>Description:</g-label>
                <g-text><slot>Displays identity of "{{service}}" RestBundle service</slot></g-text></g-row>
            <g-row>
                <g-label>REST:</g-label>
                <g-text><a :href="origin+'/'+service+'/identity'" target="_blank">/{{service}}/identity</a> 
                    <span class="text-danger">{{error}}</span></g-text>
            </g-row>
            <g-row>
                <g-label>View:</g-label>
                <g-text><a :href='"/"+service+"/ui"' target="_blank">/{{service}}/ui</a></g-text>
            </g-row>
            <g-row><g-label>Package:</g-label><g-text>{{package}}@{{version}}</g-text></g-row>
        </g-column>
    </g-row>

</template>
<script>

    import grid from './grid/grid.vue';
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

