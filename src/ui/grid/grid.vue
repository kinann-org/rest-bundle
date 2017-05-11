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
    "g-number": Vue.component("g-number", {
        template: '<div class="grid-cell grid-cell-data grid-number" @click="emitClick()" ><slot></slot></div>',
        methods,
    }),
    "g-text": Vue.component("g-text", {
        template: '<div class="grid-cell grid-cell-data grid-text" @click="emitClick()" ><slot></slot></div>',
        methods,
    }),
    "g-symbol": Vue.component("g-symbol", {
        template: '<div class="grid-cell grid-cell-data grid-symbol" @click="emitClick()" ><slot></slot></div>',
        methods,
    }),
    "g-label": Vue.component("g-label", {
        template: '<div class="grid-cell grid-cell-header grid-label" @click="emitClick()" ><slot></slot></div>',
        methods,
    }),
    "g-data": Vue.component("g-data", {
        template: '<div class="grid-cell grid-cell-data" @click="emitClick()" ><slot></slot></div>',
        methods,
    }),
    "g-header": Vue.component("g-header", {
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

export default {
    components,
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
[clickable]:hover{
    border-radius: 5px;
    border: 1px solid #d0d0d0;
    cursor: pointer;
}

</style>
