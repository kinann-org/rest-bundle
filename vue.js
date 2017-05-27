import RbIdentity from "./src/ui/RbIdentity.vue";
import RbState from "./src/ui/RbState.vue";
import RbServices from "./src/ui/RbServices.vue";
import TreeView from "./src/ui/TreeView.vue";
import TreeViewItem from "./src/ui/TreeViewItem.vue";

var components = {
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
    Object.keys(components).forEach( key => Vue.component(key, components[key]));
}

export default Object.assign({
    install: plugin,
}, mixins);
