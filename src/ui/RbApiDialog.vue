<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Displays dialog for changing all or part of the <var>apiModel</var> of a RestBundle Vue component 
            having the <code>rb-api-svc</code> mixin. When the user clicks <strong>Save</strong>,
            the updated <var>apiModel</var> is sent to the server. 
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="apiSvc" value="required" slot="prop">Vue component with rb-api-mixin.</rb-about-item>
        <rb-about-item name="apiToggle" value='"apiShowDialog"' slot="prop">
            Name of <var>apiSvc</var> property that toggles dialog visibility. </rb-about-item>
        <rb-about-item name="default" value="required" slot="slot">Dialog fields bound to apiSvc.apiModel fields</rb-about-item>
    </rb-about>
    <div v-if="about">
        <v-btn @click.stop='apiSvc[apiToggle] = true'
            primary
            > Example </v-btn>
    </div>
    <v-dialog v-model="apiSvc[apiToggle]" lazy persistent absolute width="90%">
      <v-card >
        <v-toolbar dark flat class="secondary">
            <v-btn icon small hover dark @click.stop='apiCancel()' >
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title><slot name="title">Dialog title</slot></v-toolbar-title>
            <v-spacer/>
            <v-btn v-if="!rbConnected" flat="flat" @click="apiRefresh()">Refresh</v-btn>
            <v-btn v-if="rbConnected" flat="flat" @click="apiSave(apiSvc.apiModel)">Save</v-btn>
        </v-toolbar>
        <v-card-text class="api-dialog">
            <slot>
                Dialog content goes here (e.g., <code>&lt;v-layout&gt;</code>)
                <v-alert error :value='apiSvc.apiModel == null'><var>apiSvc</var> has no <var>apiModel</var></v-alert>
                <v-text-field v-if='apiSvc && apiSvc.apiModel && apiSvc.apiModel.sampleInput != null' 
                    name="name_sampleInput" id="id_sampleInput"
                    v-model='apiSvc.apiModel.sampleInput' 
                    label="Type something" ></v-text-field>
            </slot>
        </v-card-text>
        <v-card-text v-for="(ae,i) in apiSvc.apiErrors" raised hover class="api-error" :key='i'>
            &#x2639; {{ae.message}}: {{ae.response.data.error}}
        </v-card-text>
        <v-card-text v-if="!rbConnected" raised hover class="api-error">
            &#x2639; Connection lost. Refresh when server is available.
        </v-card-text>
      </v-card>
    </v-dialog>
</div>

</template>
<script>
const Vue = require("vue").default;
class ExampleService {
    constructor() {
        this.apiModel = {};
        this.apiCancel();
    }
    apiRefresh() {
        console.log("apiRefresh");
        window.location.reload();
    }
    apiCancel() {
        console.log("apiCancel");
        this.apiShowDialog = false;
        Vue.set(this.apiModel, "sampleInput", 1234);
    }
    apiSave(apiModel) {
        console.log("apiSave", apiModel);
        this.apiShowDialog = false;
    }
    get rbConnected() {
        return true;
    }
}
var exampleSvc = new ExampleService();

export default {
    name: "RbApiDialog",
    props: {
        apiSvc: {
            default: () => exampleSvc,
        },
        apiToggle: {
            default: 'apiShowDialog',
        },
    },
    methods: {
        apiRefresh() {
            return this.apiSvc.apiRefresh();
        },
        apiSave(apiModel) {
            return this.apiSvc.apiSave(apiModel,this.apiToggle);
        },
        apiCancel() {
            return this.apiSvc.apiCancel(this.apiToggle);
        },
    },
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
    ],
    computed: {
        rbConnected() {
            return this.apiSvc.rbConnected;
        },
    },
    data() {
        return {
        }
    },
}

</script>
<style> 
.api-error {
    color: white;
    background-color: #b71c1c;
    border-top: 1pt solid #fff;
    font-size: 110%;
}
.api-dialog {
}
.api-dialog .input-group {
    background-color: #fff;
    margin-bottom: 0;
}
.api-dialog .layout+.layout {
    margin-top: 9px;
}
</style>

