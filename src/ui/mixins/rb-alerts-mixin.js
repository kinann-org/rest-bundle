const Vue = require("vue").default;

module.exports = {
    methods: {
        alert(text, type) {
            var alerts = this.$store.state.alerts.filter(a=>a.visible);
            var now = new Date();
            var alert = {
                type,
                date: `${now.toLocaleTimeString()}.${("00"+now.getMilliseconds()).slice(-3)}`,
                text,
                visible: true,
            };
            alerts.push(alert);
            Vue.set(this.$store.state,'alerts', alerts);
            console.log(`${type}: ${text});
        },
        alertSuccess(text) {
            this.alert(text, 'success');
        },
        alertError(text) {
            this.alert(text, 'error');
        },
        alertWarning(text) {
            this.alert(text, 'warning');
        },
    },
};
