<template>

<v-app id="example-2" class="xl" left-fixed-sidebar>
  <v-toolbar>
    <v-toolbar-side-icon @click.native.stop="nav2 = !nav2" />
    <v-toolbar-logo>Toolbar</v-toolbar-logo>
  </v-toolbar>
  <main>
    <v-sidebar left fixed drawer v-model="nav2">
      <v-list>
        <v-list-item v-for="i in 3" :key="i">
          <v-list-tile>
            <v-list-tile-title>Item {{ i }}</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-sidebar>
    <v-content>
      <v-container fluid>
        <div class="title">Main Content
<div id="dev">
            <h2>App.vue</h2>
            <p>
            This example shows how to integrate a RestBundle into an application.
            </p><p>
            This single page application (SPA) itself 
            demonstrates the integration of Vue components for three separate 
            RestBundles (i.e., "/test",  "/greeting" and "/aloha"): 
            </p>
            <template v-for='service of ["test", "greeting", "aloha"]'>
                <rb-identity :service="service"></rb-identity>
            </template>
            <div>
              <v-icon medium v-badge:6.right class="green--text text--darken-1">check</v-icon>
              <v-icon large v-badge:6.left class="grey--text text--lighten-1">shopping_cart</v-icon>
              <v-icon large v-badge="{ value: '!' }" class="grey--text red--after">mail</v-icon>
            </div>
</div>
        </div>
      </v-container>
    </v-content>
  </main>
</v-app>

</template> <!-- ====================================== --> <script>

import RbIdentity from 'rest-bundle/src/ui/RbIdentity.vue';

export default {
    name: 'app',
    data: function() {
        return {
            nav2: false,
        }
    },
    computed: {
        restBundles() {
            return this.$store.getters.restBundles;
        },
    },
    components: {
        RbIdentity,
    },
}

</script><!-- ====================================== --> <style>

#app {
    border: 1pt solid #fff;
    border-radius: 5px;
    padding: 5px;
}
#app:hover {
    border: 1pt solid #ccc;
}

</style>
