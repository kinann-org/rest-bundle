<template>

<div>
    <rb-about v-if="about" :name="componentName">
        <p> Displays information for RestBundle web socket server singleton.
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <div>
            {{restBundleService()}}
    </div>
</div>

</template>
<script>

    export default {
        name: "RbWebSocket",
        props: {
            model: {
                type: String,
                default: "web-socket",
                validator: (value) => value === "web-socket", // immutable
            },
            service: {
                type: String,
                default: "RbServer",
                validator: (value) => value === "RbServer", // immutable
            },
        },
        mixins: [ 
            require("./mixins/rb-about-mixin.js"),
            require("./mixins/rb-service-mixin.js"),
        ],
        computed: {
        },
        data() {
            return {
            }
        },
        beforeMount() {
            this.restBundleDispatch("loadComponentModel");
        },
        mounted() {
            console.log("mounted");
        },
        methods: {
            serviceLink(path) {
                var host = location.port === "4000" 
                    ? location.hostname + ":8080"
                    : location.host;
                return "http://" + host + "/" + this.service + path;
            },
        },
    }

</script>
<style> </style>

