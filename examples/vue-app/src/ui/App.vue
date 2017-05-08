<template>
  <div id="app">
    <h1> <img src="./assets/logo.png" height="25px"> {{msg}}</h1>
    This application currently has the following RestBundles:
    <template v-for='service of ["greeting", "aloha", "bad-service"]'>
        <rb-identity :service="service"></rb-identity>
    </template>
    <rb-identity service="greeting">
        Service components all share the same Vuex.Store data state. In this case, 
        the "greeting" service has two components that share the same state.
    </rb-identity>

  </div>

</template> <!-- ====================================== --> <script>

import RbIdentity from './RbIdentity.vue';

export default {
    name: 'app',
    data () {
        return {
            msg: 'App.vue component'
        }
    },
    computed: {
        restBundles() {
            return this.$store.getters.restBundles;
        },
    },
    components: {
        RbIdentity
    },
}

</script><!-- ====================================== --> <style>

#app {
    border: 1pt solid black;
    border-radius: 5px;
    background-color: #eee;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    padding: 5px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
