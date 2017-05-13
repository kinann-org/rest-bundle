<template>

<v-app id="dev-app" >
    <v-tabs grow>
      <v-card class="primary white--text">
          <v-card-title>Dev.vue</v-card-title>
      </v-card>
      <v-tab-item href="#app-tab-1" slot="activators"> RestBundle.vue </v-tab-item>
      <v-tab-item href="#app-tab-2" slot="activators"> AllServices.vue </v-tab-item>
      <v-tab-item href="#app-tab-3" slot="activators"> Service.vue </v-tab-item>
      <v-tab-content id="app-tab-1" slot="content" ><v-card> <v-card-text>
        <rest-bundle ></rest-bundle>
        </v-card-text> </v-card> </v-tab-content> </v-tabs-items>
      <v-tab-content id="app-tab-2" slot="content" ><v-card> <v-card-text>
        <all-services ></all-services>
        </v-card-text> </v-card> </v-tab-content> </v-tabs-items>
      <v-tab-content id="app-tab-3" slot="content" ><v-card> <v-card-text>
        <service ></service>
        </v-card-text> </v-card> </v-tab-content> </v-tabs-items>
    </v-tabs>
</v-app>

</template> <!-- ====================================== --> <script>

import RestBundle from './RestBundle.vue';
import AllServices from './AllServices.vue';
import Service from './Service.vue';

export default {
    name: 'dev',
    data: function() {
        return {
            nav2: false,
            e1: 1,
            show: "rest-bundle",
        }
    },
    components: {
        RestBundle,
        AllServices,
        Service,
    },
}

</script><!-- ====================================== --> <style>

</style>
