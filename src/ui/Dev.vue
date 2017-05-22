<template>


<v-app id="dev-app">
    <v-navigation-drawer persistent light :mini-variant.sync="mini" v-model="drawer">
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="black" >
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{package.name}} {{package.version}} </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-title class="accent--text text--darken-1">developer application</v-toolbar-title>
    </v-toolbar>
    <main>
        <v-tabs id="mobile-tabs-1" grow light v-model="active">
            <v-tabs-bar slot="activators" class="black">
                <v-tabs-item class="" ripple href="#app-tab-1" >Introduction.vue</v-tabs-item>
                <v-tabs-item class="" ripple href="#app-tab-2" >AllServices.vue</v-tabs-item>
                <v-tabs-item class="" ripple href="#app-tab-3" >Service.vue</v-tabs-item>
                <v-tabs-slider></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-content id="app-tab-1" ><v-card flat> <v-card-text>
                <introduction ></introduction>
                </v-card-text></v-card></v-tabs-content> 
            <v-tabs-content id="app-tab-2" ><v-card flat> <v-card-text>
                <all-services ></all-services>
                </v-card-text> </v-card> </v-tabs-content> 
            <v-tabs-content id="app-tab-3" ><v-card flat> <v-card-text>
                <v-card-row><v-spacer/>
                    <a target="_blank" :href="productionUrl('/test/ui')">{{productionUrl('/test/ui')}}</a></v-card-row>
                <service service="test"></service>
                </v-card-text> </v-card> </v-tabs-content> 
        </v-tabs>
        <!--
    <v-tabs grow>
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
      -->
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
            mini: "",
            text: "Lorem ipsum",
            drawer: false,
            active: "app-tab-1",
            items: [
                "red",
                "yellow",
                "green",
            ],
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
