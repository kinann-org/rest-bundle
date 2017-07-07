
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
            this.api = Object.assign(this.api, model.api);
            this.apiDialog = true;
            this.apiErrors = [];
        },
        apiSave(api) {
            this.apiErrors = [];
            var url = this.restOrigin() + "/" + this.service + "/" + this.model;
            this.$http.put(url, { api })
            .then(res => {
                this.rbCommit(res.data);
                this.api = res.data.api;
                this.apiDialog = false;
            })
            .catch(err => {
                this.apiErrors.push(err);
            });
        },
        apiLoad() {
            this.rbDispatch("apiLoad")
            .then(res => {
                this.updateObject(this.api, res.api);
            })
            .catch(err => console.error(err));
        },
    },
    data() {
        return {
            apiDialog: false,
            apiErrors: [],
            api: { },
        }
    },
}

