import RbIdentity from "./src/ui/RbIdentity.vue";
import RbState from "./src/ui/RbState.vue";
import RbServices from "./src/ui/RbServices.vue";
import RbAbout from "./src/ui/RbAbout.vue";
import RbAboutItem from "./src/ui/RbAboutItem.vue";
import TreeView from "./src/ui/TreeView.vue";
import TreeViewItem from "./src/ui/TreeViewItem.vue";

var components = {
    RbAbout,
    RbAboutItem,
    RbIdentity,
    RbServices,
    RbState,
    TreeView,
    TreeViewItem,
}

const RbService = require( "./src/ui/mixins/rb-service.js" );
var mixins = {
    RbService,
}

function plugin(Vue, options) {
    var keys = Object.keys(components);
    console.log("install", keys);
    keys.forEach( key => Vue.component(key, components[key]));
}

export default Object.assign({
    install: plugin,
    components,
}, mixins);
