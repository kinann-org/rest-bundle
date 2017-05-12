<template>

<div id="dev">
    <h1>App.vue</h1>
    <p>
    This example shows how to integrate a RestBundle into an application.
    </p><p>
    This single page application (SPA) itself 
    demonstrates the integration of Vue components for three separate 
    RestBundles (i.e., "/test",  "/greeting" and "/aloha"): 
    </p>
    <template v-for='service of ["test", "greeting", "aloha"]'>
        <rb-identity :service="service"></rb-identity>
    </template>
</div>

</template> <!-- ====================================== --> <script>

import RbIdentity from 'rest-bundle/src/ui/RbIdentity.vue';

export default {
    name: 'app',
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
    border: 1pt solid #fff;
    border-radius: 5px;
    padding: 5px;
}
#app:hover {
    border: 1pt solid #ccc;
}

</style>
