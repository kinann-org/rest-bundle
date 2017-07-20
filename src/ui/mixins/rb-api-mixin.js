
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
            var model = this.restBundleModel();
            this.apiModel = Object.assign(this.apiModel, model.apiModel);
            this[toggle] = true;
            this.apiErrors = [];
        },
        apiSave(apiModel, toggle='apiShowDialog') {
            var url = this.restOrigin() + "/" + this.service + "/" + this.apiName;
            this.$http.put(url, { apiModel })
            .then(res => {
                this.rbCommit(res.data);
                this.apiModel = res.data.apiModel;
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
                this.updateObject(this.apiModel, res.apiModel);
            })
            .catch(err => console.error(err));
        },
    },
    data() {
        return {
            apiShowDialog: false,
            apiErrors: [],
            apiModel: { },
        }
    },
};
self.createMixin = (apiName) => {
    var obj = Object.assign({}, self);
    obj.computed = obj.computed || {};
    obj.computed.apiName = () => apiName;
    return obj;
};

