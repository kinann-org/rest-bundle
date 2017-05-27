<template>

<v-card flat>
    <v-card-text>
        <h4>All Services</h4>
        <p> RestBundle applications typically have a dashboard summary of the status of all services.
            For example, this application provides the  "AllServices" dashboard to track
            the status of three RestBundle services: "/test", "/greeting", and "/aloha".
        </p>
        <rb-services :services='["test","greeting","aloha"]'/>
    </v-card-text>
</v-card>

</template>
<script>

import RbServices from './RbServices.vue';

export default {
    components: {
        RbServices,
    },
}

</script>
<style></style>
