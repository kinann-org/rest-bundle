<template>

<div >
    <rb-about v-if="about" :name="componentName">
        <p> Displays information for RestBundle web socket server singleton.
        </p>
        <rb-about-item name="about" value="false" slot="prop">Show this descriptive text</rb-about-item>
    </rb-about>
    <div class='rbws-example' v-if="about">
        <div :class="rbwsIconClass" v-on:click='toggleDetail' > &nbsp; </div>
        <transition name='fade'>
            <div v-if='showDetail && isConnected' class="rbws-text">connected: {{pushCount}}</div>
            <div v-if='!isConnected' class="rbws-no-connection">NO CONNECTION</div>
        </transition>
    </div>
    <div class="rbws-container">
        <div :class="rbwsIconClass" v-on:click='toggleDetail' > &nbsp; </div>
        <transition name='fade'>
            <div v-if='showDetail' class="rbws-text">connected: {{pushCount}}</div>
            <div v-if='!isConnected' class="rbws-no-connection">NO CONNECTION</div>
        </transition>
    </div>
</div>

</template>
<script>

    export default {
        name: "RbWebSocket",
        props: {
            model: {
                type: String,
                default: "web-socket",
                validator: (value) => value === "web-socket", // immutable
            },
            service: {
                type: String,
                default: "RbServer",
                validator: (value) => value === "RbServer", // immutable
            },
        },
        methods: {
        },
        mixins: [ 
            require("./mixins/rb-about-mixin.js"),
            require("./mixins/rb-service-mixin.js"),
        ],
        computed: {
            rbwsIconClass() {
                var c = 'rbws-icon ';
                c += this.showDetail || !this.isConnected ? 'rbws-icon-detail ' : 'rbws-icon-terse ';
                if (this.isConnected) {
                    c += (this.pushCount % 2) ? 'rbws-icon-active0' : 'rbws-icon-active1';
                } else {
                    c += 'rbws-icon-dead';
                }
                return c;
            },
        },
        data() {
            return {
                showDetail: false,
            }
        },
        beforeMount() {
            this.restBundleDispatch("loadComponentModel");
        },
        methods: {
            serviceLink(path) {
                var host = location.port === "4000" 
                    ? location.hostname + ":8080"
                    : location.host;
                return "http://" + host + "/" + this.service + path;
            },
            toggleDetail() {
                this.showDetail = !this.showDetail;
            },
        },
    }

</script>
<style> 
.rbws-container {
    position: fixed;
    top: 0px;
    right: 0px;
    display: flex;
    z-index: 99999;
}
.rbws-example {
    display: flex;
    z-index: 99999;
}
.rbws-icon {
    border-bottom-left-radius: 1em;
    height: 1em;
    width: 1em;
}
.rbws-icon:hover {
    cursor: pointer;
}
.rbws-icon-terse {
}
.rbws-icon-detail {
    height: 2em;
}
.rbws-icon-active0 {
    background-color: rgba(35,155,86,1);
}
.rbws-icon-active1 {
    background-color: rgba(35,155,86,0.8);
}
.rbws-icon-dead {
    background-color: rgba(255,0,0,1);
}
.rbws-no-connection {
    width: 10em;
    color: #fff;
    font-weight: 700;
    background-color: rgba(255,0,0,1);
    padding-top: 0.25em;
    padding-left: 0.5em;
    padding-right: 0.5em;
}
.rbws-text {
    padding-top: 0.25em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    background-color: #ddd;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
</style>

