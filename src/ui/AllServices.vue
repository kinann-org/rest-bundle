<template>

<div>
    <h5>Launching RestBundles</h5>
    <p>
    RestBundles are
    <a href="https://github.com/firepick/rest-bundle/blob/master/scripts/server.js" target="_blank"
        >instantiated when launching Nodejs.</a>
    The AllServices.vue page expects three RestBundle instances ("test", "greeting" and "aloha").
    Let's use the a bash script to launch two RestBundle instances
    and see what happens:

       <kbd>scripts/rest-bundle test aloha</code></kbd>
    </p>
    <p>
        Launch a browser and look at <a href="http://localhost:4000/">http://localhost:4000</a>.
    </p>

    <h5>Vue Components</h5>
    <p>
    All RestBundles provide an <code>/identity</code> service that returns information about
    the RestBundle. The Vue component for the identity service is <code>&lt;rb-identity&gt;</code>.
    The display will change according to how the services are launched. Here are 
    the three Vue components for our three services:
    </p>

    <div style="margin-bottom: 1em">
        <template v-for='service of ["test","greeting","aloha"]' >
            <rb-identity :service="service"></rb-identity>
        </template>
    </div>

    <p>
    Notice that we never started the "greeting" RestBundle, and we therefore
    see a red <v-icon small class="red--text text--darken-1" >error</v-icon>
    </p>

</div>

</template> <!-- ====================================== --> <script>

import RbIdentity from './RbIdentity.vue';

export default {
    name: 'dev',
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

</style>
