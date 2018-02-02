
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
    edit(opts={}) {
        var rbm = this.apiSvc.restBundleResource();
        this.toggle = true;
        this.errors = [];
        this.onSave = opts.onSave;
        return this.mutable = JSON.parse(JSON.stringify(rbm.apiModel));
    }
    save() {
        var url = this.apiSvc.restOrigin() + "/" + this.apiSvc.service + "/" + this.apiSvc.apiName;
        return this.apiSvc.$http.put(url, { apiModel: this.apiSvc.apiModelCopy })
        .then(res => {
            this.apiSvc.rbCommit(res.data);
            this.toggle = false;
            this.mutable = emptyApiModel;
            this.onSave && this.onSave();
            return res;
        })
        .catch(err => {
            var msg = `Could not Save: ${err.message}`;
            this.alertError(msg);
            console.error(msg, err.stack);
            this.mutable = emptyApiModel;
            return err;
        });
    }
    load() {
        return this.apiSvc.rbDispatch("apiLoad")
        .catch(err => {
            var msg = `Could not load: ${err.message}`;
            console.error(msg, err.stack);
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
        apiEdit(opts={}) {
            return this.api.edit(opts);
        },
        apiSave() {
            return this.api.save();
        },
        apiLoad() {
            this.onApiModelLoaded(this.apiName);
            return this.api.load();
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
