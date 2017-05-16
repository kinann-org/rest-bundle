import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import RestBundle from '../../vue.js';
import TreeView from "./TreeView.vue";
import Dev from './Dev.vue';
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
    el: '#dev',
    store: store,
    render: h => h(Dev),
})
