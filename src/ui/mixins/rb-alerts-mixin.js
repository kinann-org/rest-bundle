const Vue = require("vue").default;

module.exports = {
    methods: {
        alert(text, type) {
            var oldAlerts = this.$store.state.alerts;
            var alerts = oldAlerts && oldAlerts.filter(a=>a.visible) || [];
            var now = new Date();
            var alert = {
                type,
                date: `${now.toLocaleTimeString()}.${("00"+now.getMilliseconds()).slice(-3)}`,
                text,
                visible: true,
            };
            alerts.push(alert);
            Vue.set(this.$store.state,'alerts', alerts);
            console.log(`${type}: ${text}`);
            return alert;
        },
        alertSuccess(text) {
            return this.alert(text, 'success');
        },
        alertError(text) {
            return this.alert(text, 'error');
        },
        alertWarning(text) {
            return this.alert(text, 'warning');
        },
    },
};
