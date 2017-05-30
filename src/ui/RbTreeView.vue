<!-- Adapted from https://github.com/arvidkahl/vue-json-tree-view/blob/master/src/TreeView.vue -->
<template>
<div>
    <rb-about v-if="about" :name="componentName">
        <p> Display JSON data as an interactively collapsible tree
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="data" slot="prop">JSON data to display</rb-about-item>
        <rb-about-item name="rootKey" value="root" slot="prop">Label for root node</rb-about-item>
        <rb-about-item name="initialDepth" value="2" slot="prop">Depth of initally opened nodes</rb-about-item>
    </rb-about>
    <div class="rb-tree-view-wrapper">
        <tree-view-item class="tree-view-item-root" :data="parsedData" :max-depth="allOptions.maxDepth" :current-depth="0"></tree-view-item>
    </div>
</div>
</template>

<script>
  import _ from 'lodash';
  import TreeViewItem from './TreeViewItem.vue';
  export default {
    name: "RbTreeView",
    components:{
      TreeViewItem
    },
    mixins: [
        require("./mixins/rb-about-mixin.js"),
    ],
    props: {
        data: {
            default: () => ({
                a: {
                    hello: "world",
                },
                b: {
                    example: "This is TreeView example data",
                },
            }),
        },
        rootKey: {
            default: "root",
        },
        initialDepth: {
            default: 2,
        },
    },
    methods: {
        // Transformer for the non-Collection types,
      // like String, Integer of Float
      transformValue: function(valueToTransform, keyForValue){
        return {
            key: keyForValue,
            type: "value",
            value: valueToTransform
        }
      },
        // Since we use lodash, the _.map method will work on
      // both Objects and Arrays, returning either the Key as
      // a string or the Index as an integer
        generateChildrenFromCollection: function(collection){
            return _.map(collection, (value, keyOrIndex)=>{
            if (this.isObject(value)) {
              return this.transformObject(value, keyOrIndex);
            }
            if (this.isArray(value)) {
              return this.transformArray(value, keyOrIndex);
            }
            if (this.isValue(value)) {
              return this.transformValue(value, keyOrIndex);
            }
          }) ;
      },
        // Transformer for the Array type
      transformArray: function(arrayToTransform, keyForArray){
        return {
            key: keyForArray,
          type: "array",
          children: this.generateChildrenFromCollection(arrayToTransform)
        }
      },
      // Transformer for the Object type
        transformObject: function(objectToTransform, keyForObject, isRootObject = false){
        return {
            key: keyForObject,
            type: "object",
          isRoot: isRootObject,
          children: this.generateChildrenFromCollection(objectToTransform)
        }
      },
      // Helper Methods for value type detection
      isObject: function(value){
        return _.isPlainObject(value);
      },
      isArray: function(value){
        return _.isArray(value);
      },
      isValue: function(value){
        return !this.isObject(value) && !this.isArray(value);
      }
    },
    computed: {
      allOptions() {
          return {
              rootObjectKey: this.rootKey,
              maxDepth: this.initialDepth,
          };
      },
      parsedData(){
          var root = this.data || {error: "no data to display"};
          if (typeof root === "function") {
              root = root() || {error: "no data to display"};
          }
          // Take the JSON data and transform
          // it into the Tree View DSL
          // Strings or Integers should not be attempted to be split, so we generate
          // a new object with the string/number as the value
          if (this.isValue(root)) {
              return this.transformValue(root, this.allOptions.rootObjectKey);
          }
          // If it's an object or an array, transform as an object
          return this.transformObject(root, this.allOptions.rootObjectKey, true);
      }
    }
  };
</script>

<style scoped>
.tree-view-wrapper {
  overflow: auto;
}
/* Find the first nested node and override the indentation */
.tree-view-item-root > .tree-view-item-leaf > .tree-view-item {
  margin-left: 0!important;
}
/* Root node should not be indented */
.tree-view-item-root {
  margin-left: 0!important;
}
</style>
