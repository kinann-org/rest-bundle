function toKebabCase(id) {
    return id.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/,'');
}

module.exports = {
    props: {
        about: {
            default: false,
        }
    },
    methods: {
        toKebabCase,
    },
    computed: {
        aboutRoute() {
            return { 
                path: '/' + this.componentTag,
                component: this.componentName,
                props: {
                    about: true,
                },
            }
        },
        componentName() {
            var name = this.$vnode.tag || "NO_NAME";
            return name.split("-").pop();
        },
        componentTag() {
            return this.toKebabCase(this.componentName);
        },
    },
}
