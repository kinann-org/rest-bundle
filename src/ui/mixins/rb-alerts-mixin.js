const Vue = require("vue").default;

module.exports = {
    methods: {
        alert(text, type) {
            var alerts = this.$store.state.alerts.filter(a=>a.visible);
            var now = new Date();
            alerts.push({
                type,
                date: `${now.toLocaleTimeString()}.${("00"+now.getMilliseconds()).slice(-3)}`,
                text,
                visible: true,
            });
            console.log('alerts', alerts);
            Vue.set(this.$store.state,'alerts', alerts);
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
