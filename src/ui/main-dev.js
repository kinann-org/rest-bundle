import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

import rbvue from '../../index-vue';
import Dev from './Dev.vue';
import Introduction from './Introduction.vue';
import AllServices from './AllServices.vue';
import Service from './Service.vue';
require('./stylus/main.styl')

Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(rbvue);

var routes = [{
        path: '/',
        redirect: "/introduction"
    },
    {
        path: '/introduction',
        component: Introduction
    },
    {
        path: '/all-services',
        component: AllServices
    },
    {
        path: '/service',
        component: Service
    },
];
routes = routes.concat(rbvue.methods.aboutRoutes(rbvue.components));

const router = new VueRouter({
    routes
})

const store = new Vuex.Store({
    // your application store
});

import RbTreeView from './RbTreeView.vue';

const app = new Vue({
    el: '#dev',
    router,
    store,
    render: h => h(Dev),
    components: {
        Introduction,
        AllServices,
        Service,
        RbTreeView,
    },
}).$mount('#app');
