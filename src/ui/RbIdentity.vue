<template>

    <g-row class="rb-component rb-identity" >
        <g-column> 
            <gd v-gsymbol clickable @click='showDetail=!showDetail' >
                <span :class='"glyphicon "+(error? "glyphicon-remove text-danger" : "glyphicon-ok text-success")'></span>
            </gd> 
        </g-column>
        <g-column>
            <g-row><gh v-glabel>Service:</gh><gd v-gtext><code>/{{service}}</code></gd></g-row>
            <g-row><gh v-glabel>showDetail:</gh><gd v-gtext>{{showDetail}}</gd></g-row>
            <g-row><gh v-glabel>Component:</gh><gd v-gtext><code>&lt;{{selector}}&gt;</code> {{stateType}}#{{stateId}}</gd></g-row>
            <g-row><gh v-glabel>Description:</gh><gd v-gtext><slot>Displays identity of "{{service}}" RestBundle service</slot></gd></g-row>
            <g-row>
                <gh v-glabel>REST:</gh>
                <gd v-gtext><a :href="origin+'/'+service+'/identity'" target="_blank">/{{service}}/identity</a> 
                    <span class="text-danger">{{error}}</span></gd>
            </g-row>
            <g-row>
                <gh v-glabel >View:</gh>
                <gd v-gtext > <a :href="origin+'/'+service+'/ui'" target="_blank">/{{service}}/ui</a></gd>
            </g-row>
            <g-row><gh v-glabel>Package:</gh><gd v-gtext>{{package}}@{{version}}</gd></g-row>
        </g-column>
    </g-row>

</template><script>

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

