import RbIdentity from "./src/ui/RbIdentity.vue";
import RbState from "./src/ui/RbState.vue";
import RbServices from "./src/ui/RbServices.vue";
import RbAbout from "./src/ui/RbAbout.vue";
import RbAboutItem from "./src/ui/RbAboutItem.vue";
import RbTreeView from "./src/ui/RbTreeView.vue";
import RbWebSocket from "./src/ui/RbWebSocket.vue";

var components = {
    RbAbout,
    RbAboutItem,
    RbIdentity,
    RbServices,
    RbState,
    RbTreeView,
    RbWebSocket,
}

const RbServiceMixin = require( "./src/ui/mixins/rb-service-mixin.js" );
const RbAboutMixin = require( "./src/ui/mixins/rb-about-mixin.js" );
var mixins = {
    RbAboutMixin,
    RbServiceMixin,
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
