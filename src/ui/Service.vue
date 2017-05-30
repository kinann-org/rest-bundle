<template>

<v-card flat>
    <v-card-row class="primary" >
        <v-card-title class="white--text">
            <span >Service Home Page</span>
            <v-spacer></v-spacer>
            <span >/{{serviceFromUrl}}</span>
        </v-card-title>
    </v-card-row>
    <v-card-text >
        <p> A RestBundle service can provide a dedicated home page to handle service specific interactions.
            If a RestBundle service provides a dedicated home page, it should be located at <code>/SERVICE/ui</code>.
            For example, this is the service home page for RestBundle "{{serviceFromUrl}}":
            <ul>
                <li><b>Production:</b><a target="_blank" :href='origin+"/"+serviceFromUrl+"/ui"'>
                    /{{serviceFromUrl}}/ui</a></li>
                <li><b>Development:</b> <a href="/#/service">/#/service</a></li>
            </ul>
        </p>

        <h5>Service status</h5>
        <rb-identity class="mb-3" :service="serviceFromUrl"></rb-identity>

    </v-card-text>
</v-card>

</template><script>

export default {
    name: "service",
    computed: {
        origin() {
            return location.port === "4000" 
                ? "http://localhost:8080"
                : location.origin;
        },
        serviceFromUrl() {
            var path = location.href.split("#")[0];
            var subpaths = path.split("/");
            console.log("subpaths", subpaths);
            return subpaths[3] || "test";
        },
    },
}

</script>
<style> 
</style>
