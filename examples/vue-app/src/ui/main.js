import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import store from './store';

new Vue({
    el: '#app',
    store: store,
    render: h => h(App),
})
