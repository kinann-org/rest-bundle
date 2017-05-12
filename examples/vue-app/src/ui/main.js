import Vue from 'vue';
import App from './App.vue';
import store from 'rest-bundle/src/ui/store';

new Vue({
    el: '#app',
    store: store,
    render: h => h(App),
})
