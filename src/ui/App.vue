<template>
  <div id="app">
    <h3> <img src="./assets/logo.png" height="25px"> {{msg}}</h3>
    This is root Vue component for testing this package.
    The component verifies and displays the status of three RestBundle 
    REST services (i.e., "/test",  "/greeting" and "/aloha").
    To see this, use the <code>rest-bundle</code> script to launch services 
    named in the command line.
    For example, you can launch the application with:
    <ul>
        <li><code>scripts/rest-bundle test </code></li>
        <li><code>scripts/rest-bundle test greeting</code></li>
        <li><code>scripts/rest-bundle test greeting aloha</code></li>
        <li>etc.</li>
    </ul>
    <template v-for='service of ["test", "greeting", "aloha"]'>
        <rb-identity :service="service"></rb-identity>
    </template>
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
        RbIdentity,
    },
}

</script><!-- ====================================== --> <style>

#app {
    border: 1pt solid black;
    border-radius: 5px;
    background-color: #eee;
    padding: 5px;
}

</style>
