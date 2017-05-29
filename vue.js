import RbIdentity from "./src/ui/RbIdentity.vue";
import RbState from "./src/ui/RbState.vue";
import RbServices from "./src/ui/RbServices.vue";
import RbAbout from "./src/ui/RbAbout.vue";
import RbAboutItem from "./src/ui/RbAboutItem.vue";
import TreeView from "./src/ui/TreeView.vue";

var components = {
    RbAbout,
    RbAboutItem,
    RbIdentity,
    RbServices,
    RbState,
    TreeView,
}

const RbService = require( "./src/ui/mixins/rb-service.js" );
var mixins = {
    RbService,
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
    console.log("install", keys);
    keys.forEach( key => Vue.component(key, components[key]));
}

export default Object.assign({
    install: plugin,
    components,
    methods,
    mixins,
}, mixins);
