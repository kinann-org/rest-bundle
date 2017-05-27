<template>

<v-card flat>
    <v-card-text>
        <h4>Introduction</h4>
        <p> This is a Vue web application for developing RestBundle REST services.
            Use this as a template for creating your own RestBundles.
        </p>

        <h6>What is a RestBundle?</h6>
        <p> A RestBundle is a named end-to-end web service that comprises:
            <ul>
                <li>web front-end Vue component(s)</li>
                <li>back-end REST service(s)</li>
            </ul>
        </p><p>
        Since RestBundles are end-to-end components, they can be easily combined
        to create an application. For example, this application conssts of
        three RestBundle instances named: "/test",  "/greeting" and "/aloha".
        </p>

        <h6>REST Services </h6>
        <p> RestBundle Node.js REST services are provided by subclasses of <code>RestBundle.js</code>.
            The REST services for RestBundle itself are described below. Subclasses can override the
            default implementation:
            <v-container fluid>
                <v-layout>
                    <v-flex xs4><b>REST Service</b></v-flex>
                    <v-flex xs2><b>Method</b></v-flex>
                    <v-flex xs6><b>Description</b></v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs4><code>/SERVICE/identity</code></v-flex>
                    <v-flex xs2>GET</v-flex>
                    <v-flex xs6>Return version and package of RestBundle SERVICE</v-flex>
                </v-layout>
            </v-container>
        </p>

        <h6>Vue Components</h6>
        <p> Each RestBundle has multiple Vue components that can be combined into web client applications. 
            See sidebar for list of Vue compoents.
        </p>

        <h4>Developing a RestBundle</h4>
        <h6>Develop back-end on localhost:8080</h6>
        <p> Launch a web server for back-end development by typing 
            <kbd>npm start</kbd>.
            <ul>
                <li><b>localhost:8080</b> hosts the RestBundle REST services and production web content from last build</li>
            </ul>
        </p>

        <h6>Develop front-end on localhost:4000</h6>
        <p> Front-end develop works best with a hot update web server, which is on port 4000.
            Type <kbd>npm run dev</kbd> to launch two web servers for front-end development:
            <ul>
                <li><b>localhost:8080</b> hosts the RestBundle REST services and production web content</li>
                <li><b>localhost:4000</b> hosts the RestBundle Vue components with hot updates</li>
            </ul>
            </p>
        </p>

        <h6>Production</h6>
        <p> To create and test a production build, type <kbd>npm run build && npm start</kbd>.
        </p>
    </v-card-text>
</v-card>

</template>
<script>

export default {
    name: 'introduction',
}

</script>
<style> </style>
