<script>

import Vue from 'vue';

var colWidth = 3; // em

var gridCell = function(cols) { return function() { return {
    width: (Number(cols) * colWidth) + "em",
}}};

var methods = {
    emitClick: function() {
        this.$emit("click");
    }
};

var components = {
    grid: Vue.component("grid", { 
        template: '<div class="grid" ><slot></slot></div>',
    }),
    gd: Vue.component("gd", {
        template: '<div class="grid-cell grid-cell-data" @click="emitClick()" ><slot></slot></div>',
        methods,
    }),
    gh: Vue.component("gh", {
        template: '<div class="grid-cell grid-cell-header" @click="emitClick()" ><slot></slot></div>',
        methods,
    }),
};
components["g-column"] = Vue.component("g-column", { 
    template: '<div class="grid-column" @click="emitClick()" ><slot></slot></div>',
    methods,
});
components["g-row"] = Vue.component("g-row", { 
    template: '<div class="grid-row" @click="emitClick()" ><slot></slot></div>',
    methods,
});

for (let i = 1; i<=12; i++) {
    let gdi = "gd" + i;
    components[gdi] = Vue.component(gdi, {
        computed: { cellStyle: gridCell(i) },
        template: '<div class="grid-cell grid-cell-data" :style="cellStyle" @click="emitClick()" ><slot></slot></div>',
        methods,
    });
    var ghi = "gh" + i;
    components[ghi] = Vue.component(ghi, {
        computed: { cellStyle: gridCell(i) },
        template: '<div class="grid-cell grid-cell-header" :style="cellStyle" @click="emitClick()" ><slot></slot></div>',
        methods,
    });
}

var directives = {
    "gtext": Vue.directive('gtext', function (el, binding) {
        var c = el.getAttribute("class") || "";
        el.setAttribute("class", c + " grid-text");
    }),
    "gsymbol": Vue.directive('gsymbol', function (el, binding) {
        var c = el.getAttribute("class") || "";
        el.setAttribute("class", c + " grid-symbol");
    }),
    "gnumber": Vue.directive('gnumber', function (el, binding) {
        var c = el.getAttribute("class") || "";
        el.setAttribute("class", c + " grid-number");
    }),
    "glabel": Vue.directive('glabel', function (el, binding) {
        var c = el.getAttribute("class") || "";
        el.setAttribute("class", c + " grid-label");
    }),
};

export default {
    components,
    directives,
};

</script><style>

.grid-column {
    display:flex; 
    flex-direction:column;
    padding-top: 0.1em;
    padding-bottom: 0.1em;
    text-align: center;
}
.grid-row {
    text-align: left;
    display:flex; 
    flex-direction:row;
    flex-wrap: wrap;
    padding-left:0.2em;
    padding-right:0.2em;
}
.grid {
    padding: 0.1em;
}
.grid-cell-data, grid-cell-header {
    vertical-align: top;
    padding: 0.1em;
    width: 6em;
}
.grid-cell-header {
    font-weight: 700;
}
.grid-text {
    min-width: 27em;
}
.grid-symbol {
    width: 3em;
    text-align: center;
}
.grid-number {
    width: 6em;
    text-align: right;
}
.grid-label {
    width: 9em;
}
[clickable] {
    cursor: pointer;
}
[clickable]:hover{
    border-radius: 5px;
    border: 1px solid #d0d0d0;
}

</style>
