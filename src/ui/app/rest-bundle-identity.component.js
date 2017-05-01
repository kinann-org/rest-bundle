"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var RestBundleIdentityComponent = (function () {
    function RestBundleIdentityComponent(eref, http) {
        var _this = this;
        this.http = http;
        this.name = 'rest-bundle-identity';
        this.date = new Date();
        this.package = "(package unknown)";
        this.version = "(version unknown)";
        this.service = "/UNKNOWN";
        this.description = "";
        this.service = "/" + eref.nativeElement.getAttribute("service") || "expected attribute:service";
        this.description = eref.nativeElement.getAttribute("description") || this.description;
        setInterval(function () { return (_this.date = new Date()); }, 1000);
    }
    RestBundleIdentityComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ngOnInit");
        this.http.get(this.service + "/identity")
            .toPromise()
            .then(function (res) {
            var json = res.json();
            _this.package = json.package || _this.package;
            _this.version = json.version || _this.version;
        })
            .catch(function (err) { return console.log("err", err); });
    };
    return RestBundleIdentityComponent;
}());
RestBundleIdentityComponent = __decorate([
    core_1.Component({
        selector: 'rest-bundle-identity',
        template: "\n        <div class=\"rb-root\">\n            <table>\n                <caption>&lt;{{name}}&gt;</caption>\n                <tr><th>Description:</th><td>{{description}}</td></tr>\n                <tr><th>Service:</th><td>{{service}}/identity</td></tr>\n                <tr><th>Package:</th><td>{{package}}</td></tr>\n                <tr><th>Version:</th><td>{{version}}</td></tr>\n                <tr><th>Date:</th><td>{{date}}</td></tr>\n            </table>\n        </div>\n        ",
        styleUrls: ['./rest-bundle.module.css'],
        providers: [],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, http_1.Http])
], RestBundleIdentityComponent);
exports.RestBundleIdentityComponent = RestBundleIdentityComponent;
//# sourceMappingURL=rest-bundle-identity.component.js.map