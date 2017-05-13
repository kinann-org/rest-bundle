import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import store from 'rest-bundle/src/ui/store';
require('./stylus/main.styl')

Vue.use(Vuetify);

new Vue({
    el: '#app',
    store: store,
    render: h => h(App),
})
