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
const HelloRest = require("../test/hello-rest");
var helloRest = new HelloRest("greeting");
helloRest.bindExpress(app);

```

Launch web server:

```JS
npm start
```

A RestBundle can be shared for use by others as an npm package.

### Vue 2
RestBundle relies on [Vue.js](https://vuejs.org/) for modular web components.

1. `npm run dev`
1. http://localhost:4000/greeting/ui


## State Model
RestBundle uses [Vuex](https://vuex.vuejs.org/en/) as its application store.
The RestBundle state hierarchy comprises one or more services having one or more API's, each
of which has its own apiModel:

`state.restBundle.`<i>service</i>`.`<i>apiName</i>`.`<i>apiModel</i>

Vue components that serve as the primary view of a RestBundle api must define a 'service' property
and include the `rb-api-mixin`. 

```
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
        require("./mixins/rb-api-mixin.js").createMixin("web-socket"),
    ],
    props: {
        service: "RbServer",
    },
    beforeMount(): {
        this.apiLoad().then(apiModel=>...).catch(e=>...);
    },
```

Other RestBundle Vue components can become informed of the loading of another
apiModel using the promise returned by `onApiModelLoaded(apiName,service)`:

```
    mixins: [ 
        require("./mixins/rb-about-mixin.js"),
        require("./mixins/rb-api-mixin.js").createMixin("some-other-api"),
    ],
    props: {
        service: "RbServer",
    },
    beforeMount(): {
        this.onApiModelLoaded("web-socket", "RbServer").then(apiModel=>...).catch(e=>...);
    },
```
