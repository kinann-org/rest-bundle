
const Vue = require("vue").default;
const axios = require("axios");

const emptyApiModel = {error:"apiModelCopy must be initialized by calling this.apiEdit()"};

class RbApi {
    constructor(apiName, apiSvc) {
        this.apiSvc = apiSvc;
        this.toggle = false;
        this.errors = [];
        this.apiName = apiName;
        this.mutable = emptyApiModel;
    }
    refresh() {
        window.location.reload();
    }
    cancel() {
        this.toggle = false;
        this.mutable = emptyApiModel;
    }
    edit() {
        var rbm = this.apiSvc.restBundleResource();
        this.toggle = true;
        this.errors = [];
        return this.mutable = JSON.parse(JSON.stringify(rbm.apiModel));
    }
    save() {
        var url = this.apiSvc.restOrigin() + "/" + this.apiSvc.service + "/" + this.apiSvc.apiName;
        return this.apiSvc.$http.put(url, { apiModel: this.apiSvc.apiModelCopy })
        .then(res => {
            this.apiSvc.rbCommit(res.data);
            this.toggle = false;
            this.mutable = emptyApiModel;
            return res;
        })
        .catch(err => {
            console.error(err.stack);
            this.errors.push(err);
            this.mutable = emptyApiModel;
            return err;
        });
    }
    load() {
        return this.apiSvc.rbDispatch("apiLoad")
        .catch(err => {
            console.error(err);
            return err;
        });
    }
}

var RbApiMixin = {
    mixins: [ 
        require("./rb-service-mixin.js"),
    ],
    methods: {
        apiRefresh() {
            return this.api.refresh();
        },
        apiCancel() {
            return this.api.cancel();
        },
        apiEdit() {
            return this.api.edit();
        },
        apiSave() {
            return this.api.save();
        },
        onApiModelLoaded(service=this.service, apiName=this.apiName) {
            var state = this.$store.state;
            var rbSvc = state.restBundle[service];
            if (rbSvc[apiName] && rbSvc[apiName].apiModel) {
                return Promise.resolve(rbSvc[apiName].apiModel)
            }
            return new Promise((resolve,reject) => {
                var unwatch = this.$store.watch(()=>{
                    return rbSvc[apiName].apiModel;
                }, (apiModel)=> {
                    console.log(`onApiModelLoaded(restBundle/${service}/${apiName})`);
                    resolve(apiModel);
                });
            });
        },
        apiLoad() {
            this.onApiModelLoaded();
            var p =  this.api.load();
            return p;
        },
    },
    computed: {
        apiDialogToggle() {
            return this.api.toggle;
        },
        apiModel() {
            return this.rbResource.apiModel;
        },
        apiModelCopy() { // deprecated
            return this.api.mutable;
        },
        apiName() {
            return this.api.apiName;
        },
    },
};

RbApiMixin.createMixin = function(apiName) {
    var obj = Object.assign({}, RbApiMixin);
    obj.computed = obj.computed || {};
    obj.data = function() {
        var api = new RbApi(apiName, this);
        return {
            api,
            apiSvc: this, // scoping
        }
    };
    return obj;
};

module.exports = RbApiMixin;
