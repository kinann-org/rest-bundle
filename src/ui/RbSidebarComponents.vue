<template>

<div>
    <v-list-tile 
        v-for="(item,i) in sidebarComponents" :key="i"
        exact :to="item.href">
        <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-icon v-show='$route.path === item.href'>keyboard_arrow_right</v-icon>
        </v-list-tile-action>
    </v-list-tile>
</div>

</template>
<script>

function toKebabCase(id) {
    return id.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/,'');
}

function aboutSidebar(comps = components) {
    return Object.keys(comps).map( key => ({
        title: key,
        href: "/" + toKebabCase(key),
    }));
}

export default {
    name: "RbSidebarComponents",
    props: {
        components: {
            required: true,
        },
    },
    data() {
        return {
            sidebarComponents: aboutSidebar(this.components),
        }
    },
}

</script>
<style> </style>

