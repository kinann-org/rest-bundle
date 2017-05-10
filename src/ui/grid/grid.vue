<script>

import Vue from 'vue';

var colWidth = 3; // em

var gridCell = function(cols) { return function() { return {
    width: (Number(cols) * colWidth) + "em",
}}};

var grid = {
    gr: Vue.component("gr", { 
        template: '<div style="display:flex; flex-direction:row"> <slot></slot> </div>',
    }),
    gc: Vue.component("gc", { 
        template: '<div style="display:flex; flex-direction:column"> <slot></slot> </div>',
    }),
};
for (var i = 1; i<=12; i++) {
    var gdi = "gd" + i;
    grid[gdi] = Vue.component(gdi, {
        computed: { cellStyle: gridCell(i) },
        template: '<div class="grid-cell grid-cell-data" :style="cellStyle"><slot></slot></div>',
    });
    var ghi = "gh" + i;
    grid[ghi] = Vue.component(ghi, {
        computed: { cellStyle: gridCell(i) },
        template: '<div class="grid-cell grid-cell-header" :style="cellStyle"><slot></slot></div>',
    });
}

export default grid;
</script>
