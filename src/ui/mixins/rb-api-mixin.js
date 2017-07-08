
const Vue = require("vue").default;
const axios = require("axios");

module.exports = {
    mixins: [ 
        require("./rb-service-mixin.js"),
    ],
    methods: {
        apiRefresh() {
            this.apiDialog = false;
            window.location.reload();
        },
        apiCancel() {
            this.apiDialog = false;
        },
        apiOpen() {
            var model = this.restBundleModel();
            this.apiModel = Object.assign(this.apiModel, model.apiModel);
            this.apiDialog = true;
            this.apiErrors = [];
        },
        apiSave(apiModel) {
            this.apiErrors = [];
            var url = this.restOrigin() + "/" + this.service + "/" + this.model;
            this.$http.put(url, { apiModel })
            .then(res => {
                this.rbCommit(res.data);
                this.apiModel = res.data.apiModel;
                this.apiDialog = false;
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
            apiDialog: false,
            apiErrors: [],
            apiModel: { },
        }
    },
}

