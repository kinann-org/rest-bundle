<template>

<v-app id="example-2" class="xl" left-fixed-sidebar>
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
</v-app>

</template> <!-- ====================================== --> <script>

export default {
    name: 'app',
}

</script> <style>

body {
    padding: 10px;
}

</style>
