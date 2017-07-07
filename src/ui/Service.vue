<template>

<v-card flat>
    <v-card-title class="primary white--text title">
        <span >Service Home Page</span>
        <v-spacer></v-spacer>
        <span >/{{serviceFromUrl}}</span>
    </v-card-title>
    <v-card-text >
        <p> A RestBundle service can provide a dedicated home page to handle service specific interactions.
            If a RestBundle service provides a dedicated home page, it should be located at <code>/SERVICE/ui</code>.
            For example, this is the service home page for RestBundle "{{serviceFromUrl}}":
            <ul>
                <li><b>Production:</b><a target="_blank" :href='restOrigin+"/"+serviceFromUrl+"/ui"'>
                    /{{serviceFromUrl}}/ui</a></li>
                <li><b>Development:</b> <a href="/#/service">/#/service</a></li>
            </ul>
        </p>

        <h5>Service Identity</h5>
        <rb-identity class="mb-3" :service="serviceFromUrl"></rb-identity>

    </v-card-text>
</v-card>

</template>
<script>

import rbvue from "../../vue.js";

export default {
    name: "service",
    mixins: [ rbvue.mixins.RbServiceMixin ],
}

</script>
<style> </style>
