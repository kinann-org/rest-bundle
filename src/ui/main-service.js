import Vue from 'vue';
import Vuetify from 'vuetify';
import Service from './Service.vue';
import store from './store';
require('./stylus/main.styl')

Vue.use(Vuetify);

new Vue({
    el: '#service',
    store: store,
    render: h => h(Service),
    beforeMount() {
        if ( null == this.$el.attributes["service-name"]) {
            throw new Error("service name is required");
        }
        this.$store.state.serviceName = this.$el.getAttribute("service-name");
        console.log("main-service beforeMount", this.$store.state.serviceName);
    },
})
