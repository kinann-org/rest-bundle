import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
    },  
    getters: {
        stateData: function(state) { 
            return function(component,stateName) {
                var typeData = state[component];
                return typeData == null || stateName == null 
                    ? typeData 
                    : typeData[stateName];
            };
        },
    },
    mutations: {
        registerData: function(state, data) {
            var serviceName = data.serviceName || "UNKNOWN_serviceName";
            var services = state.restBundles || Vue.set(state, "restBundles", {
                [serviceName]: {}
            });
            var service = services[serviceName] || Vue.set(services, serviceName, {});
            var service = services[serviceName];
            var component = data.component || "UNKNOWN_component";
            Vue.set(service, data.component, data);
            debug && console.log("store.registerData", component, data.stateName);
        },
    },
});
