# RestBundle
Simplify REST API creation and maintentance with re-usable REST bundles.
Encapsulate related REST services in a single JavaScript class that extends RestBundle.

Example: Define a REST bundle comprising a single resource (i.e., `/greeting/hello`)
with handlers for GET and POST:

```JS
class HelloRest extends RestBundle {
    constructor(name="greeting",options = {}) {
        super(name, options);
    }

    get handlers() {return [
        new ResourceMethod("get", "hello", this.getHello, "text/html"),
        new ResourceMethod("post", "hello", this.postHello, "application/json" ),
    ]}

    getHello(req, res) {
        return "hello";
    }

    postHello(req, res) {
        throw new Error("goodbye");
    }
}
```

Add HelloRest into a nodejs application:

```JS
const HelloRest = require("../src/hello-rest");
var helloRest = new HelloRest("greeting");
helloRest.bindExpress(app);

```

A RestBundle can be shared for use by others as an npm package.
