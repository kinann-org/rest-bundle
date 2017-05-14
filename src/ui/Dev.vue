<template>


<v-app id="dev-app" >
    <v-tabs grow>
        <v-card class="primary">
            <v-card-title>
            <span class="light-blue--text">{{package.name}} {{package.version}} </span>
            <v-spacer></v-spacer>
            <span class="light-blue--text">development application</span>
            </v-card-title>
        </v-card>
            <v-tab-item href="#app-tab-1" slot="activators"> Introduction.vue </v-tab-item>
            <v-tab-item href="#app-tab-2" slot="activators"> AllServices.vue </v-tab-item>
            <v-tab-item href="#app-tab-3" slot="activators"> Service.vue </v-tab-item>
            <v-tab-content id="app-tab-1" slot="content" ><v-card> <v-card-text>
                <introduction ></introduction>
                </v-card-text></v-card></v-tab-content> 
        <v-tab-content id="app-tab-2" slot="content" ><v-card> <v-card-text>
            <all-services ></all-services>
            </v-card-text> </v-card> </v-tab-content> 
        <v-tab-content id="app-tab-3" slot="content" ><v-card> <v-card-text>
            <service ></service>
            </v-card-text> </v-card> </v-tab-content> 
    </v-tabs>
</v-app>

</template> <!-- ====================================== --> <script>

import Introduction from './Introduction.vue';
import AllServices from './AllServices.vue';
import Service from './Service.vue';

export default {
    name: 'dev',
    data() {
        return {
            package: require("../../package.json"),
        }
    },
    components: {
        Introduction,
        AllServices,
        Service,
    },
}

</script><!-- ====================================== --> <style>

</style>
