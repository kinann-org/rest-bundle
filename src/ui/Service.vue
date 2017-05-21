<template>

<v-card >
    <v-card-row class="secondary" >
        <v-card-title>
            <span >Service Home Page</span>
            <v-spacer></v-spacer>
            <span >/{{serviceFromUrl}}</span>
        </v-card-title>
    </v-card-row>
    <v-card-text >
        <p> Each named RestBundle instance has its very own home page.
            This is the service home page for RestBundle "{{serviceFromUrl}}".
            This page is located at:
            <ul>
                <li><b>Production:</b><a target="_blank" :href='"/"+serviceFromUrl+"/ui/index-service"'>
                    /{{serviceFromUrl}}/ui/index-service</a></li>
                <li><b>Development:</b>Service.vue tab (i.e., this page)</li>
            </ul>
        </p>

        <h5>Server status</h5>
        <rb-identity class="mb-3" :service="serviceFromUrl"></rb-identity>

        <h5>Back-end development</h5>
        <p> Type <kbd>npm start</kbd> to launch the Node.js server:
            <ul>
                <li><b>localhost:8080</b> hosts the RestBundle REST services and production web content from last build</li>
            </ul>
        </p>

        <h5>Front-end development</h5>
        <p> Type <kbd>npm run dev</kbd> to launch two web servers for front-end development:
            <ul>
                <li><b>localhost:8080</b> hosts the RestBundle REST services and production web content</li>
                <li><b>localhost:4000</b> hosts the RestBundle Vue components with hot updates</li>
            </ul>
            <p> Note: For development only the "test"  Service.vue component is shown on port 4000. All others
                services (e.g., "greeting" and "aloha")
                can only be displayed on port 8080, not port 4000:
                <ul>
                    <li><a target="_blank" href="http://localhost:8080/test/ui">http://localhost:8080/test/ui</a></li>
                    <li><a target="_blank" href="http://localhost:8080/greeting/ui">http://localhost:8080/greeting/ui</a></li>
                    <li><a target="_blank" href="http://localhost:8080/aloha/ui">http://localhost:8080/aloha/ui</a></li>
                </ul>
            </p><p>
            In production, only one port will be used.
            </p>
        </p>

        <h5>Production</h5>
        <p> Type <kbd>npm run build</kbd> to update the current distribution files.</p>
        <p> Type <kbd>npm start</kbd> to start the web server:
            <ul>
                <li><b>localhost:8080</b> hosts the updated RestBundle REST services and production web content</li>
            </ul>
        </p>
    </v-card-text>
</v-card>

</template><script>

import RbIdentity from './RbIdentity.vue';

export default {
    name: "service",
    computed: {
        serviceFromUrl() {
            var subpaths = location.href.split("/");
            return subpaths[3] || "test";
        },
    },
    components: {
        RbIdentity
    },
}

</script>
<style> </style>
