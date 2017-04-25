# RestBundle
Simplify REST API creation and maintentance with re-usable REST bundles.
Encapsulate related REST services in a single JavaScript class that extends RestBundle.

**Example:** Define a REST bundle comprising a single resource (i.e., `/greeting/hello`)
with handlers for GET and POST:

```JS
class HelloRest extends RestBundle {
    constructor(name="greeting",options = {}) {
        super(name, options);
        var handlers = [
            this.resourceMethod("get", "hello", this.getHello, "text/html"),
            this.resourceMethod("post", "hello", this.onDie),
        ];
        Object.defineProperty(this, "handlers", {
            value: handlers,
        });
    }

    getHello(req, res) { return "hello"; }

    postHello(req, res) { throw new Error("goodbye"); }
}
```

Add HelloRest to a nodejs application:

```JS
const HelloRest = require("../src/hello-rest");
var helloRest = new HelloRest("greeting");
helloRest.bindExpress(app);

```

Launch web server:

```JS
npm start
```

A RestBundle can be shared for use by others as an npm package.

### Angular 4.0
The `src/ui` folder is a slightly rearranged copy of [Angular 2 Quickstart](https://github.com/angular/quickstart).
To see the UI:

1. `npm start`
1. http://localhost:8080/greeting/ui

In this `hello-rest` example, we create a `<greeting-ui>' Angular AppComponent for our REST service bundle.
The `<greeting-ui>` selector name is derived from the bundle name ("greeting"), allowing you to build web
applications with mulitple rest-bundle instances using AppComponents with different names.
