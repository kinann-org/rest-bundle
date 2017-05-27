<template>

<v-app id="dev-app">
   <v-navigation-drawer persistent light v-model="drawer" light>
      <v-list dense>
        <v-list-item v-for="item in sidebarMain" :key="item">
          <v-list-tile exact router :href="item.href">
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
        </v-list-item>
        <v-subheader>Vue Components</v-subheader>
        <v-list-item v-for="item in sidebarComponents" :key="item">
          <v-list-tile exact router :href="item.href">
            <v-list-tile-action>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-icon v-show='$route.path === item.href'>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="black" >
        <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="grey--text text--lighten-1">{{package.name}} {{package.version}}</v-toolbar-title>
        <v-toolbar-title class="purple--text hidden-xs-only"
            style="position:absolute; right:0; ">dev app</v-toolbar-title>
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
            sidebarComponents: [{
                title: "RbIdentity",
                href: "/rb-identity",
            },{
                title: "RbState",
                href: "/rb-state",
            }],
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
