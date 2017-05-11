<template>

<div id="dev">
    <h1>Dev.vue</h1>
    <p>
    This is the RestBundle development application.
    </p><p>
    <h3>What is a RestBundle?</h3>
    A RestBundle is a single Nodejs package that comprises both the web front-end
    as well as the back-end implementations of a REST service. RestBundles are
    robust vertical application slices that facilitate the development of lightweight
    application shells.
    </p><p>
    This single page application (SPA) itself 
    demonstrates the integration of Vue components for three separate 
    RestBundles (i.e., "/test",  "/greeting" and "/aloha"): 
    </p>
    <template v-for='service of ["test", "greeting", "aloha"]'>
        <rb-identity :service="service"></rb-identity>
    </template>
    Each <code>&lt;rb-identity&gt;</code> Vue component shown above
    displays the status of its corresponding service.
    The display will change according to how the services are launched.
    If we launch ony "test" and "aloha", the "greeting" RestBundle will show 
    a red X:
    <ul>
       <li><code>scripts/rest-bundle test aloha</code></li>
    </ul>

    <h3>Multiple Vue Components</h3>
    Each RestBundle typically has multiple Vue components. The RestBundle
    package alone has the following Vue components: 
    <ul>
        <li><strong>Dev.vue</strong> is the development view that shows components for multiple services</li>
        <li><strong>Service.vue</strong> is the end-user "home page" for an individual service</li>
        <li><strong>RbIdentity.vue</strong> is the Vue component for the <code>/identity</code> REST method 
            that describes an individual service</li>
    </ul>
    <service></service>
</div>

</template> <!-- ====================================== --> <script>

import RbIdentity from './RbIdentity.vue';
import Service from './Service.vue';

export default {
    name: 'dev',
    computed: {
        restBundles() {
            return this.$store.getters.restBundles;
        },
    },
    components: {
        RbIdentity,
        Service,
    },
}

</script><!-- ====================================== --> <style>

#dev {
    border: 1pt solid #fff;
    border-radius: 5px;
    padding: 5px;
}
#dev:hover {
    border: 1pt solid #ccc;
}

</style>
