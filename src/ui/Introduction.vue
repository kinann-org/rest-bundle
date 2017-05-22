<template>

<div>
    <h5>What is a RestBundle?</h5>
    A RestBundle is a single Nodejs package that comprises both the web front-end
    as well as the back-end implementations of a REST service. RestBundles are
    robust vertical application slices that facilitate the development of lightweight
    application shells.
    </p><p>
    This single page application (SPA) itself 
    demonstrates the integration of Vue components for three separate 
    RestBundles (i.e., "/test",  "/greeting" and "/aloha"): 
    </p>

    <h5>RestBundle REST Services </h5>
    <p>
    REST services are provided by subclasses of <code>RestBundle.js</code>. RestBundle itself
    provides the <code>/identity</code> HTTP GET service method that returns information
    about a RestBundle (e.g, version, package, etc.). RestBundle subclasses
    will provide additional services.
    </p><p>
    RestBundles are named. The names distinguish different services that perform
    the same tasks but for different endpoints. For examples a LatheRestBundle could
    have two instances, "LatheA" and "LatheB", which perform the same functions for
    two different lathes via separate services, "/LatheA/rpm" and "/LatheB/rpm".
    </p><p>
    RestBundles are easily
    <a href="https://github.com/firepick/rest-bundle/blob/master/scripts/server.js" target="_blank"
        >instantiated when launching Nodejs</a>
    </p>

    <h5>RestBundle Vue Components</h5>
    <p> Each RestBundle has multiple Vue components that can be combined into web client applications. 
        Each Vue component has, by convention, a "service-name" attribute that specifies the 
        name of the associated RestBundle REST service.
        For example, the <code>rest-bundle</code> package alone includes the following Vue components: 
        <ul class="pl-4">
            <li><strong>Dev.vue</strong> is the Vue root component for the rest-bundle development application.</li>
            <li><strong>AllServices.vue</strong> provides information about multiple RestBundle instances</li>
            <li><strong>Service.vue</strong> is the end-user "home page" for an individual service</li>
            <li><strong>RbIdentity.vue</strong> is the Vue component for the <code>/identity</code> REST method 
                that describes an individual service</li>
        </ul>
    </p>
</div>

</template>
<script>

export default {
    name: 'introduction',
}

</script>
<style> </style>
