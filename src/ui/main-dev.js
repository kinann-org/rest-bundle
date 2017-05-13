import Vue from 'vue';
import Vuetify from 'vuetify';
import RestBundle from '../../vue.js';
import Dev from './Dev.vue';
import store from './store';
require('./stylus/main.styl')

Vue.use(Vuetify);
Vue.use(RestBundle);

new Vue({
    el: '#dev',
    store: store,
    render: h => h(Dev),
})
