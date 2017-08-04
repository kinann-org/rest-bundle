
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
        apiCancel(toggle='apiDefaultDialog') {
            this[toggle] = false;
            this.apiModelCopy = emptyApiModel;
        },
        apiEdit(toggle='apiDefaultDialog') {
            var rbm = this.restBundleResource();
            this[toggle] = true;
            this.apiErrors = [];
            return this.apiModelCopy = JSON.parse(JSON.stringify(rbm.apiModel));
        },
        apiSave(toggle='apiDefaultDialog') {
            var url = this.restOrigin() + "/" + this.service + "/" + this.apiName;
            return this.$http.put(url, { apiModel: this.apiModelCopy })
            .then(res => {
                this.rbCommit(res.data);
                this[toggle] = false;
                this.apiModelCopy = emptyApiModel;
            })
            .catch(err => {
                console.error(err.stack);
                this.apiErrors.push(err);
                this.apiModelCopy = emptyApiModel;
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
            apiDefaultDialog: false,
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

