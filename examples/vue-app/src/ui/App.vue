<template>

<v-app id="example-2" class="xl" left-fixed-sidebar>
    <main>
        <v-card>
            <div id="dev">
                <h2>App.vue</h2>
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
        </v-card>
    </main>
</v-app>

</template> <!-- ====================================== --> <script>

import RbIdentity from 'rest-bundle/src/ui/RbIdentity.vue';

export default {
    name: 'app',
    data: function() {
        return {
            nav2: false,
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
    border: 1pt solid #fff;
    border-radius: 5px;
    padding: 5px;
}
#app:hover {
    border: 1pt solid #ccc;
}

</style>
