import Vue from 'vue';
import Service from './Service.vue';
import store from './store';

new Vue({
    el: '#service',
    store: store,
    render: h => h(Service),
})
