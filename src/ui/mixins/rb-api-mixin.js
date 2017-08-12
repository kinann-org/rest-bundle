
const Vue = require("vue").default;
const axios = require("axios");

const emptyApiModel = {error:"apiModelCopy must be initialized by calling this.apiEdit()"};

var self = module.exports = {
    mixins: [ 
        require("./rb-service-mixin.js"),
    ],
    methods: {
        apiRefresh() {
            window.location.reload();
        },
        apiCancel(toggle='apiDialogToggle', scope=this) {
            scope[toggle] = false;
            scope.apiModelCopy = emptyApiModel;
        },
        apiEdit(toggle='apiDialogToggle', scope=this) {
            var rbm = this.restBundleResource();
            scope[toggle] = true;
            scope.apiErrors = [];
            return scope.apiModelCopy = JSON.parse(JSON.stringify(rbm.apiModel));
        },
        apiSave(toggle='apiDialogToggle', scope=this) {
            var url = this.restOrigin() + "/" + this.service + "/" + this.apiName;
            return this.$http.put(url, { apiModel: scope.apiModelCopy })
            .then(res => {
                this.rbCommit(res.data);
                scope[toggle] = false;
                scope.apiModelCopy = emptyApiModel;
            })
            .catch(err => {
                console.error(err.stack);
                scope.apiErrors.push(err);
                scope.apiModelCopy = emptyApiModel;
            });
        },
        apiLoad() {
            return this.rbDispatch("apiLoad")
            //.then(res => {
                //if (this.apiModelCopy) {
                    //console.log("DEPRECATED apiLoad updated apiModelCopy");
                    ////this.updateObject(this.apiModelCopy, res.apiModel);
                //}
            //})
            .catch(err => console.error(err));
        },
    },
    data() {
        return {
            apiSvc: this,
            apiDialogToggle: false,
            apiErrors: [],
            apiModelCopy: emptyApiModel,
        }
    },
};
self.createMixin = (apiName) => {
    var obj = Object.assign({}, self);
    obj.computed = obj.computed || {};
    obj.computed.apiName = () => apiName;
    return obj;
};

