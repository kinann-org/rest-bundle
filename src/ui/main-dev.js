import Vue from 'vue';
import Dev from './Dev.vue';
import store from './store';

new Vue({
    el: '#dev',
    store: store,
    render: h => h(Dev),
})
