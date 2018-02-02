import RbIdentity from "./src/ui/RbIdentity.vue";
import RbState from "./src/ui/RbState.vue";
import RbServices from "./src/ui/RbServices.vue";
import RbAbout from "./src/ui/RbAbout.vue";
import RbAlerts from "./src/ui/RbAlerts.vue";
import RbAboutItem from "./src/ui/RbAboutItem.vue";
import RbTreeView from "./src/ui/RbTreeView.vue";
import TreeViewItem from "./src/ui/TreeViewItem.vue";
import RbWebSocket from "./src/ui/RbWebSocket.vue";
import RbApiDialog from "./src/ui/RbApiDialog.vue";
import RbDialogRow from "./src/ui/RbDialogRow.vue";

var components = {
    RbAbout,
    RbAboutItem,
    RbAlerts,
    RbApiDialog,
    RbDialogRow,
    RbIdentity,
    RbServices,
    RbState,
    RbTreeView,
    RbWebSocket,
    TreeViewItem,

}

const RbApiMixin = require( "./src/ui/mixins/rb-api-mixin.js" );
const RbServiceMixin = require( "./src/ui/mixins/rb-service-mixin.js" );
const RbAboutMixin = require( "./src/ui/mixins/rb-about-mixin.js" );
var mixins = {
    RbAboutMixin,
    RbServiceMixin,
    RbApiMixin,
}

function toKebabCase(id) {
    return id.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/,'');
}
function aboutRoutes(comps = components) {
    return Object.keys(comps).map(key => {
        var component = comps[key];
        return {
            path: '/' + toKebabCase(key),
            component: component,
            props: {
                about: true, 
            },
        };
    })
}
function aboutSidebar(comps = components) {
    return Object.keys(comps).map( key => ({
        title: key,
        href: "/" + toKebabCase(key),
    }));
}

var methods = {
    aboutRoutes,
    aboutSidebar,
    toKebabCase,
}

function plugin(Vue, options) {
    var keys = Object.keys(components);
    keys.forEach( key => Vue.component(key, components[key]));
}

export default Object.assign({
    install: plugin,
    components,
    methods,
    mixins,
}, mixins);
