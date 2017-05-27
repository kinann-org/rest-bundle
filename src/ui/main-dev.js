import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

import RestBundle from '../../vue.js';
import TreeView from "./TreeView.vue";
import Dev from './Dev.vue';
import Introduction from './Introduction.vue';
import AllServices from './AllServices.vue';
import Service from './Service.vue';
import RbState from './RbState.vue';
import RbIdentity from './RbIdentity.vue';
require('./stylus/main.styl')

Vue.use(VueAxios, axios);
Vue.use(TreeView);
Vue.use(Vuex);;
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(RestBundle);
Vue.use(TreeView);

const routes = [
    { path: '/', redirect: "/introduction" },
    { path: '/introduction', component: Introduction },
    { path: '/all-services', component: AllServices },
    { path: '/service', component: Service },
    { path: '/rb-state', component: RbState, props: {about: true, service: "test"} },
    { path: '/rb-identity', component: RbIdentity, props: {about: true, service: "test"} },
];
const router = new VueRouter({
    routes 
})

const store = new Vuex.Store({
    // your application store
});

new Vue({
    el: '#dev',
    router,
    store,
    render: h => h(Dev),
    components: {
        Introduction,
        AllServices,
        Service,
    },
})
