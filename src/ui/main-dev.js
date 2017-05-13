import Vue from 'vue';
import Vuetify from 'vuetify';
import Dev from './Dev.vue';
import store from './store';
require('./stylus/main.styl')

Vue.use(Vuetify);

new Vue({
    el: '#dev',
    store: store,
    render: h => h(Dev),
})
