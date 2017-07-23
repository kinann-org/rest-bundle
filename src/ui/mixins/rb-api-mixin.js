
const Vue = require("vue").default;
const axios = require("axios");

var self = module.exports = {
    mixins: [ 
        require("./rb-service-mixin.js"),
    ],
    methods: {
        apiRefresh() {
            window.location.reload();
        },
        apiCancel(toggle='apiShowDialog') {
            this[toggle] = false;
        },
        apiEdit(toggle='apiShowDialog') {
            var rbm = this.restBundleModel();
            this.apiDialogModel = Object.assign(this.apiDialogModel, rbm.apiModel);
            this[toggle] = true;
            this.apiErrors = [];
        },
        apiSave(toggle='apiShowDialog') {
            var url = this.restOrigin() + "/" + this.service + "/" + this.apiName;
            this.$http.put(url, { apiModel: this.apiDialogModel })
            .then(res => {
                this.rbCommit(res.data);
                this[toggle] = false;
            })
            .catch(err => {
                console.error(err.stack);
                this.apiErrors.push(err);
            });
        },
        apiLoad() {
            this.rbDispatch("apiLoad")
            .then(res => {
                if (this.apiDialogModel) {
                    console.log("apiLoad updated apiDialogModel");
                    this.updateObject(this.apiDialogModel, res.apiModel);
                }
            })
            .catch(err => console.error(err));
        },
    },
    data() {
        return {
            apiShowDialog: false,
            apiErrors: [],
            apiDialogModel: {},
        }
    },
};
self.createMixin = (apiName) => {
    var obj = Object.assign({}, self);
    obj.computed = obj.computed || {};
    obj.computed.apiName = () => apiName;
    return obj;
};

