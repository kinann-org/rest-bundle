
const Vue = require("vue").default;
const axios = require("axios");

module.exports = {
    mixins: [ 
        require("./rb-service-mixin.js"),
    ],
    methods: {
        apiRefresh(toggle='apiShowDialog') {
            this[toggle] = false;
            window.location.reload();
        },
        apiCancel(toggle='apiShowDialog') {
            this[toggle] = false;
        },
        apiOpen(toggle='apiShowDialog') {
            var model = this.restBundleModel();
            this.apiModel = Object.assign(this.apiModel, model.apiModel);
            this[toggle] = true;
            this.apiErrors = [];
        },
        apiSave(apiModel, toggle='apiShowDialog') {
            this.apiErrors = [];
            var url = this.restOrigin() + "/" + this.service + "/" + this.model;
            this.$http.put(url, { apiModel })
            .then(res => {
                this.rbCommit(res.data);
                this.apiModel = res.data.apiModel;
                this[toggle] = false;
            })
            .catch(err => {
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
}

