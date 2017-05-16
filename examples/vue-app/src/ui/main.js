import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import RestBundleVue from 'rest-bundle/vue';
import App from './App.vue';
require('./stylus/main.styl')

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(RestBundleVue);

const store = new Vuex.Store({
    // your app store
});

new Vue({
    el: '#app',
    store: store,
    render: h => h(App),
})
