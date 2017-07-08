<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Displays dialog for changing api model.
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
        <rb-about-item name="apiSvc" value="required" slot="prop">Vue component with rb-api-mixin.</rb-about-item>
    </rb-about>
    <div v-if="about">
        <v-btn @click.native.stop='apiSvc.apiDialog = true'
            primary
            > Example </v-btn>
    </div>
    <v-dialog v-model="apiSvc.apiDialog" lazy persistent absolute width="90%">
      <v-card >
        <v-toolbar dark flat class="secondary">
            <v-btn icon small hover dark @click.native.stop='apiCancel()' >
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title><slot name="title">Dialog title</slot></v-toolbar-title>
            <v-spacer/>
            <v-btn v-if="!rbConnected" flat="flat" @click.native="apiRefresh()">Refresh</v-btn>
            <v-btn v-if="rbConnected" flat="flat" @click.native="apiSave(apiSvc.apiModel)">Save</v-btn>
        </v-toolbar>
        <v-card-text class="api-dialog">
            <slot>
                Dialog content goes here (use &lt;v-card-text&gt;)
                <v-text-field name="name_sampleInput" id="id_sampleInput"
                    v-model='apiSvc.apiModel.sampleInput' 
                    label="Type something" ></v-text-field>
            </slot>
        </v-card-text>
        <v-card-text v-for="ae in apiSvc.apiErrors" raised hover class="api-error" :key='ae'>
            &#x2639; {{ae}}
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
        this.apiDialog = true;
        this.apiModel = {
            sampleInput: 1234,
        };
    }
    apiRefresh() {
        console.log("apiRefresh");
        window.location.reload();
    }
    apiCancel() {
        console.log("apiCancel");
        this.apiDialog = false;
    }
    apiSave(apiModel) {
        console.log("apiSave", apiModel);
        this.apiDialog = false;
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
            default: () => (new class {
                constructor() {
                    this.apiDialog = true;
                    this.apiModel = {
                        sampleInput: 1234,
                    };
                }
                apiRefresh() {
                    console.log("apiRefresh");
                    window.location.reload();
                }
                apiCancel() {
                    console.log("apiCancel");
                    this.apiDialog = false;
                    Vue.set(this.apiModel, "sampleInput", 1234);
                }
                apiSave(apiModel) {
                    console.log("apiSave", apiModel);
                    this.apiDialog = false;
                }
                get rbConnected() {
                    return true;
                }

            }),
        },
    },
    methods: {
        apiRefresh() {
            return this.apiSvc.apiRefresh();
        },
        apiSave(apiModel) {
            return this.apiSvc.apiSave(apiModel);
        },
        apiCancel() {
            return this.apiSvc.apiCancel();
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
            apiDialog: false,
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

