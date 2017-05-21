<template>


<v-app id="dev-app" >
    <v-tabs grow>
        <v-card class="primary">
            <v-card-title class="pt-2 pb-1">
            <span class="light-blue--text">{{package.name}} {{package.version}} </span>
            <v-spacer></v-spacer>
            <span class="light-blue--text">development application</span>
            </v-card-title>
        </v-card>
        <v-tab-item class="pb-1" href="#app-tab-1" slot="activators"> Introduction.vue </v-tab-item>
        <v-tab-item class="pb-1" href="#app-tab-2" slot="activators"> AllServices.vue </v-tab-item>
        <v-tab-item class="pb-1" href="#app-tab-3" slot="activators"> Service.vue </v-tab-item>
        <v-tab-content id="app-tab-1" slot="content" ><v-card> <v-card-text>
            <introduction ></introduction>
            </v-card-text></v-card></v-tab-content> 
        <v-tab-content id="app-tab-2" slot="content" ><v-card> <v-card-text>
            <all-services ></all-services>
            </v-card-text> </v-card> </v-tab-content> 
        <v-tab-content id="app-tab-3" slot="content" ><v-card> <v-card-text>
            <v-card-row><v-spacer/>
                <a target="_blank" :href="productionUrl('/test/ui')">{{productionUrl('/test/ui')}}</a></v-card-row>
            <service service="test"></service>
            </v-card-text> </v-card> </v-tab-content> 
    </v-tabs>
</v-app>

</template>  
<script>

import Introduction from './Introduction.vue';
import AllServices from './AllServices.vue';
import Service from './Service.vue';

export default {
    name: 'dev',
    data() {
        return {
            package: require("../../package.json"),
        }
    },
    methods: {
        productionUrl(path) {
            var host = location.port === "4000"
                ? location.hostname + ":8080"
                : location.host;
            return "http://" + host + path;
        },
    },
    components: {
        Introduction,
        AllServices,
        Service,
    },
}

</script> 
<style> </style>
