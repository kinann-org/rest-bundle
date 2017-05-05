"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/http");
const rb_identity_component_1 = require("./rb-identity.component");
const rb_index_links_component_1 = require("./rb-index-links.component");
let RbModule = class RbModule {
};
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
        exports: [
            rb_identity_component_1.RbIdentity,
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