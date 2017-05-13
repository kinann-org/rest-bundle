import RbIdentity from "./src/ui/RbIdentity.vue";

var components = {
    RbIdentity,
}
function plugin(Vue, options) {
    Object.keys(components).forEach( key => Vue.component(key, components[key]));
}

export default {
    install: plugin,
}
