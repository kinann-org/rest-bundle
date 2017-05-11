<script>

import Vue from 'vue';

var colWidth = 3; // em

var gridCell = function(cols) { return function() { return {
    width: (Number(cols) * colWidth) + "em",
}}};

var components = {
    grid: Vue.component("grid", { 
        template: '<div class="grid" ><slot></slot></div>',
    }),
    gr: Vue.component("gr", { 
        template: '<div class="grid-row" ><slot></slot></div>',
    }),
    gc: Vue.component("gc", { 
        template: '<div class="grid-column" ><slot></slot></div>',
    }),
}
for (var i = 1; i<=12; i++) {
    var gdi = "gd" + i;
    components[gdi] = Vue.component(gdi, {
        computed: { cellStyle: gridCell(i) },
        template: '<div class="grid-cell grid-cell-data" :style="cellStyle"><slot></slot></div>',
    });
    var ghi = "gh" + i;
    components[ghi] = Vue.component(ghi, {
        computed: { cellStyle: gridCell(i) },
        template: '<div class="grid-cell grid-cell-header" :style="cellStyle"><slot></slot></div>',
    });
}

export default components;

</script><style>

.grid {
    padding: 0.1em;
}
.grid-cell-data, grid-cell-header {
    vertical-align: top;
    padding: 0.1em;
    flex-wrap: wrap;
}
.grid-cell-header {
    font-weight: 700;
}
.grid-column {
    text-align: left;
    display:flex; 
    flex-direction:column;
    padding-top: 0.1em;
    padding-bottom: 0.1em;
}
.grid-row {
    text-align: left;
    display:flex; 
    flex-direction:row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-left:0.2em;
    padding-right:0.2em;
}

</style>
