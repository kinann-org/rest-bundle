import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import RestBundle from '../../vue.js';
import TreeView from "./TreeView.vue";
import Service from './Service.vue';
require('./stylus/main.styl')

Vue.use(TreeView)
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(RestBundle);
Vue.use(TreeView);

const store = new Vuex.Store({
    // your application store
});

new Vue({
    el: '#service',
    store: store,
    render: h => h(Service),
    //beforeMount() {
        //if ( null == this.$el.attributes["service"]) {
            //throw new Error("service name is required");
        //}
        //this.$store.state.RestBundle.serviceName = this.$el.getAttribute("service");
        //console.log("main-service beforeMount", this.$store.state.RestBundle.service);
    //},
})
