import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        restBundles: {
        },
    },  
    getters: {
        restBundles: (state, getters) => {
            console.log("getters restBundles", state.restBundles);
            return Object.keys(state.restBundles);
        }
    },
    mutations: {
        addRestBundle(state, rb) {
            console.log("addRestBundle", rb);
            Vue.set(state.restBundles, rb.name, rb);
            console.log("addRestBundle", state.restBundles);
        },
    },
});
