var axios = require("axios");

console.log("RbIdentity loaded");

var RbIdenity_instances = 0;
export default class RbIdentity { 
    constructor(service) {
        this.instance = ++RbIdentity_instances;
        this.name = 'rb-identity'; 
        this.package = "(package?)";
        this.version = "(version?)";
        this.service = service || "(service?)";
    }
    onCreated() {
        var that = this;
        axios.get("/" + that.service + "/identity")
            .then((res) => {
                var json = res.json();
                that.package = json.package || that.package;
                that.version = json.version || that.version;
            })
            .catch((err) => console.log("err", err));
    }
}//class
