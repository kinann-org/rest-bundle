<template>

  <div class="rb-service" id="service">
    <h3>Service.vue component</h3>
    This is the <slot>Vue component</slot> for the "{{serviceName}}" RestBundle service.
    <rb-identity :service="serviceName"></rb-identity>
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

.rb-service {
    border: 1pt solid #fff;
    border-radius: 5px;
    padding: 5px;
}
.rb-service:hover {
    border: 1pt solid #ccc;
}

</style>
