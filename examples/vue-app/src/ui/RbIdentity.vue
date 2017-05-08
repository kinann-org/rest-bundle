<template>

<div class="rb-component rb-identity" v-bind:class="{danger: error}">
    <table>
        <tr><th>Component:</th><td>&lt;{{selector}}&gt; {{stateType}}#{{stateId}}</td></tr>
        <tr><th>Description:</th><td><slot>Displays identity of "{{service}}" RestBundle service</slot></td></tr>
        <tr><th>REST:</th><td><code>GET {{origin}}/{{service || "NO-SERVICE"}}/identity</code> {{error}}</td></tr>
        <tr><th>Package:</th><td>{{package}}@{{version}}</td></tr>
    </table>
</div>

</template><!- ==================== --> <script>

var RbService = require("./mixins/rb-service.js");

export default {
    mixins: [RbService],
}

</script><!-- ================= --><style>

.rb-component {
    border: 1pt solid #888;
    background-color: #eee;
    margin: 0.1em;
}
.danger {
    color: #800 !important;
    background-color: #fee !important;
}

</style>

