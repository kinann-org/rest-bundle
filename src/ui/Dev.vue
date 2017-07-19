<template>

<v-app id="dev-app">
   <v-navigation-drawer persistent light v-model="drawer" light>
      <v-list dense>
        <v-list-tile exact :to="item.href"
                v-for="item in sidebarMain" :key="item">
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
                <v-icon dark>info</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>RestBundle Components</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile 
                v-for="item in sidebarComponents" :key="item"
                exact :to="item.href">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon v-show='$route.path === item.href'>keyboard_arrow_right</v-icon>
                </v-list-tile-action>
            </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed flat class="black" >
        <v-toolbar-side-icon light class="black white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="grey--text text--lighten-1">
            <div style="display:flex; flex-flow:column; ">
                <span class="mr-2" >{{package.name}} {{package.version}}</span>
                <span class="caption">developer application</span>
            </div>
        </v-toolbar-title>
        <v-spacer/>
        <rb-web-socket/>
    </v-toolbar>
    <main>
        <v-container fluid> <router-view/> </v-container>
    </main>
</v-app>

</template>  
<script>

import Introduction from './Introduction.vue';
import AllServices from './AllServices.vue';
import Service from './Service.vue';
import RbWebSocket from './RbWebSocket.vue';
import rbvue from "../../index-vue";

export default {
    name: 'dev',
    data() {
        return {
            package: require("../../package.json"),
            drawer: false,
            sidebarRestBundle:false,
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
            sidebarComponents: rbvue.methods.aboutSidebar(rbvue.components),
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
        RbWebSocket,
    },
}

</script> 
<style> </style>
