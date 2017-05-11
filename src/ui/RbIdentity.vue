<template>

    <gr class="rb-component rb-identity" >
        <gc > <gd1 class="text-right" clickable @click='showDetail=!showDetail' >
            <span :class='"glyphicon "+(error? "glyphicon-remove text-danger" : "glyphicon-ok text-success")'></span>
        </gd1> </gc>
        <gc>
            <gr><gh3>Service:</gh3><gd9><code>/{{service}}</code></gd9></gr>
            <gr><gh3>showDetail:</gh3><gd9>{{showDetail}}</gd9></gr>
            <gr><gh3>Component:</gh3><gd9><code>&lt;{{selector}}&gt;</code> {{stateType}}#{{stateId}}</gd9></gr>
            <gr><gh3>Description:</gh3><gd9><slot>Displays identity of "{{service}}" RestBundle service</slot></gd9></gr>
            <gr>
                <gh3>REST:</gh3>
                <gd9><a :href="origin+'/'+service+'/identity'" target="_blank">/{{service}}/identity</a> 
                    <span class="text-danger">{{error}}</span></gd9>
            </gr>
            <gr>
                <gh3>View:</gh3>
                <gd9> <a :href="origin+'/'+service+'/ui'" target="_blank">/{{service}}/ui</a> </gd9>
            </gr>
            <gr><gh3>Package:</gh3><gd9>{{package}}@{{version}}</gd9></gr>
        </gc>
    </gr>

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

