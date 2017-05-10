<template>
  <div class="rb-service" id="service">
    <h1> <img src="./assets/logo.png" height="25px"> {{msg}}</h1>
    This is the Vue component for the "{{service}}" RestBundle service.
    <template v-for='service of ["test", "greeting", "aloha"]'>
        <rb-identity :service="service"></rb-identity>
    </template>
  </div>

</template> <!-- ====================================== --> <script>

import RbIdentity from './RbIdentity.vue';

export default {
    name: 'service',
    data () {
        return {
            msg: 'Service.vue component'
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

.rb-service {
    border: 1pt solid #eee;
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

a {
  color: #42b983;
}
body {
    max-width: 45em;
}
</style>
