<template>

<div class="rb-component rb-identity" v-bind:class="{danger: error}">
    <gr>
        <gc v-if="error" ><gd1><span class="glyphicon glyphicon-remove"></span></gd1></gc>
        <gc v-else><gd1><span class="glyphicon glyphicon-ok icon-ok"></span></gd1></gc>
        <gc>
            <gr><gh3>Component:</gh3><gd8>&lt;{{selector}}&gt; {{stateType}}#{{stateId}}</gd8></gr>
            <gr><gh3>Description:</gh3><gd8><slot>Displays identity of "{{service}}" RestBundle service</slot></gd8></gr>
            <gr>
                <gh3>REST:</gh3>
                <gd8>
                    GET <a :href="origin+'/'+service+'/identity'" target="_blank">{{origin}}/{{service}}/identity</a> 
                    {{error}}
                </gd8>
            </gr>
            <gr><gh3>Package:</gh3><gd8>{{package}}@{{version}}</gd8></gr>
        </gc>
    </gr>
</div>

</template><!- ==================== --> <script>

import grid from './grid/grid.vue';

var RbService = require("./mixins/rb-service.js");

export default {
    mixins: [RbService],
    components: Object.assign({}, grid),
}

</script><!-- ================= --><style>

.danger {
    color: #800 !important;
    background-color: #fee !important;
}

</style>

