import RbIdentity from "./src/ui/RbIdentity.vue";
import RbState from "./src/ui/RbState.vue";
import TreeView from "./src/ui/TreeView.vue";
import TreeViewItem from "./src/ui/TreeViewItem.vue";
const RbService = require( "./src/ui/mixins/rb-service.js" );

var components = {
    RbIdentity,
    RbState,
    RbService,
    TreeView,
    TreeViewItem,
}
function plugin(Vue, options) {
    Object.keys(components).forEach( key => Vue.component(key, components[key]));
}

export default {
    install: plugin,
}
