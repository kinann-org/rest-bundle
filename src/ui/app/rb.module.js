"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var rb_identity_component_1 = require("./rb-identity.component");
var rb_index_links_component_1 = require("./rb-index-links.component");
var RbModule = (function () {
    function RbModule() {
    }
    return RbModule;
}());
RbModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
        ],
        declarations: [
            rb_identity_component_1.RbIdentity,
            rb_index_links_component_1.RbIndexLinks,
        ],
        providers: [],
        bootstrap: [
            rb_identity_component_1.RbIdentity,
            rb_index_links_component_1.RbIndexLinks,
        ]
    })
], RbModule);
exports.RbModule = RbModule;
//# sourceMappingURL=rb.module.js.map