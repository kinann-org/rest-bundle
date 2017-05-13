<template>

  <div class="rb-service" id="service">
    <p>
    Each named RestBundle instance has its very own Vue component accessed
    on the <code>/<i>service-name</i>/ui</code> path. Here is the 
    Vue component</slot> for the "{{serviceName}}" RestBundle service.
    </p>

    <rb-identity class="mb-3" :service="serviceName"></rb-identity>

    <h6>Different HTTP ports</h6>
    <p>
    For development, we split the RestBundle across the following HTTP ports:
    </p>
    <div class="pb-3"><ul class="pl-4">
        <li>localhost:8080 provides the RestBundle REST services</li>
        <li>localhost:4000 hosts the RestBundle Vue components</li>
    </ul></div>
    <p>
    Using two separate ports simultaneously lets us develop/test the client and server
    ends of the RestBundle independently. 
    </p>
    <p>
    Note: Only the "test"  Service.vue component is shown on port 4000. All others
    services (e.g., "greeting" and "aloha")
    can only be displayed on port 8080, not port 4000:
    <div class="pb-3"><ul class="pl-4">
        <li><a target="_blank" href="http://localhost:8080/test/ui">http://localhost:8080/test/ui</a></li>
        <li><a target="_blank" href="http://localhost:8080/greeting/ui">http://localhost:8080/greeting/ui</a></li>
        <li><a target="_blank" href="http://localhost:8080/aloha/ui">http://localhost:8080/aloha/ui</a></li>
    </ul></div>
    In production, only one port will be used.
    </p>
  </div>

</template><script>

import RbIdentity from './RbIdentity.vue';

export default {
    name: "service",
    computed: {
        serviceName() {
            return this.$store.state.serviceName || "test";
        },
        restBundles() {
            return this.$store.getters.restBundles;
        },
    },
    mounted() {
        console.log("service mounted");
    },
    components: {
        RbIdentity
    },
}

</script><style>


</style>
