(function(gtweedle) {
    class Tweedle {
        constructor() {
        }
        say(msg) {
            console.log("Tweedle:", msg);
        }
    }
    function secret(msg) {
        console.log("Tweedle secret:", msg);
    }

    new Tweedle().say("tweedle.js declare");
    secret("declare");

    gtweedle.Tweedle = Tweedle;
})(typeof gtweedle === "object" ? gtweedle : (gtweedle = {}))

new gtweedle.Tweedle().say("tweedlejs gtweedle");
