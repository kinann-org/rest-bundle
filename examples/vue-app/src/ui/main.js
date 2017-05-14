import Vue from 'vue';
import Vuetify from 'vuetify';
import RestBundleVue from 'rest-bundle/vue';
import App from './App.vue';
import store from 'rest-bundle/src/ui/store';
require('./stylus/main.styl')

Vue.use(Vuetify);
Vue.use(RestBundleVue);

new Vue({
    el: '#app',
    store: store,
    render: h => h(App),
})
