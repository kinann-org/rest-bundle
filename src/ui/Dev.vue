<template>

<v-app id="app">
   <v-navigation-drawer temporary absolute persistent light v-model="drawer" app>
      <v-list dense>
        <v-list-tile exact :to="item.href"
                v-for="(item,i) in sidebarMain" :key="i" router>
            <v-list-tile-action>
                <v-icon >{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-icon v-show='$route.path === item.href'>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
        </v-list-tile>
        <v-list-group value="sidebarRestBundle">
            <v-list-tile slot="item">
              <v-list-tile-action>
                <v-icon >help</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>rest-bundle</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <rb-sidebar-components :components='rbComponents'/>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed flat class="black" app>
        <v-toolbar-side-icon dark @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="grey--text text--lighten-1">
            <div style="display:flex; flex-flow:column; ">
                <span class="mr-2" >{{package.name}} {{package.version}}</span>
                <span class="caption">developer application</span>
            </div>
        </v-toolbar-title>
        <v-spacer/>
        <rb-web-socket/>
    </v-toolbar>
    <v-content app>
        <v-container fluid >
            <router-view></router-view>
        </v-container>
    </v-content>
    <rb-alerts service="test"/>
</v-app>

</template>  
<script>

import Introduction from './Introduction.vue';
import AllServices from './AllServices.vue';
import RbAlerts from './RbAlerts.vue';
import Service from './Service.vue';
import RbWebSocket from './RbWebSocket.vue';
import RbSidebarComponents from './RbSidebarComponents.vue';
import rbvue from "../../index-vue";

export default {
    name: 'dev',
    data() {
        return {
            package: require("../../package.json"),
            drawer: false,
            sidebarMain: [{
                icon: "info",
                title: "Introduction",
                href: "/introduction",
            },{
                icon: "web",
                title: "All Services",
                href: "/all-services",
            },{
                icon: "web_asset",
                title: "Service Home Page",
                href: "/service",
            }],
            sidebarRestBundle:false,
            rbComponents: rbvue.components,
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
        RbAlerts,
        AllServices,
        Service,
        RbWebSocket,
        RbSidebarComponents,
    },
}

</script> 
<style> </style>
