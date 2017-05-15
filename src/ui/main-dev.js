import Vue from 'vue';
import Vuetify from 'vuetify';
import RestBundle from '../../vue.js';
import TreeView from "./TreeView.vue";
Vue.use(TreeView)
import Dev from './Dev.vue';
import store from './store';
require('./stylus/main.styl')

Vue.use(Vuetify);
Vue.use(RestBundle);
Vue.use(TreeView);

new Vue({
    el: '#dev',
    store: store,
    render: h => h(Dev),
})
