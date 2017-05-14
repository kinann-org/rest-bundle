<template>

<v-app>
    <v-card>
        <v-card-row class="teal darken-2">
            <v-card-title class="white--text">
                A Sample Application
            </v-card-title>
        </v-card-row>
        <v-card-text>
            <p> In this sample application, we integrate
                three separate RestBundle <code>&lt;rb-identity&gt;</code> 
                Vue components (i.e., "/test",  "/greeting" and "/aloha")
                imported from the <code>rest-bundle</code> npm package: 
            </p>
            <template v-for='service of ["test", "greeting", "aloha"]'>
                <rb-identity :service="service"></rb-identity>
            </template>
        </v-card-text>
    </v-card>
</v-app>

</template> <!-- ====================================== --> <script>

export default {
    name: 'app',
}

</script> <style>

</style>
