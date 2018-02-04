<template>

<div>
    <rb-about v-if="about" :name="componentName">
        <p> Displays dismissible alerts for application
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <div v-if="about">
        <v-btn v-if="about" @click="alertSuccess(`happiness`)"> Success </v-btn>
        <v-btn v-if="about" @click="alertWarning(`you hear an unexpected noise`)"> Warning </v-btn>
        <v-btn v-if="about" @click="alertError(`did something die in here?`)"> Error </v-btn>
    </div>
    <v-footer fixed v-if="hasAlerts">
        <v-layout v-show="hasAlerts">
            <v-flex>
                <v-alert v-for="alert in alerts" :key="alert.date" :color="alertColor(alert)" 
                    :type="alert.type" dismissible v-model="alert.visible" >
                    {{alert.date}}: {{alert.text}}
                </v-alert>
            </v-flex>
        </v-layout>
    </v-footer>
</div>

</template>
<script>
import Vue from "vue";

export default {
    name: "RbAlerts",
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
        require("./mixins/rb-alerts-mixin.js"),
    ],
    computed: {
        hasAlerts() {
            var alerts = this.$store.state.alerts;
            return alerts && alerts.reduce((acc,a) => a || a.visible,false);
        },
        alerts() {
            if (!this.$store || !this.$store.state) {
                return [];
            }
            var alerts = this.$store.state.alerts;
            if (alerts == null) {
                alerts = [];
                Vue.set(this.$store.state, "alerts", alerts);
            }
            return alerts;
        },
    },
    methods: {
        alertColor(alert) {
            if (alert.type === 'warning') {
                return "orange darken-1";
            }
            if (alert.type === 'success') {
                return "green darken-2";
            }
            if (alert.type === 'error') {
                return "red darken-2";
            }
            return "";
        },
    },
}

</script>
<style> 
</style>

