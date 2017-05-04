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
var RbIdentity = RbIdentity_1 = (function () {
    function RbIdentity(eref, http) {
        this.http = http;
        this.instance = ++RbIdentity_1.instances;
        this.name = 'rb-identity';
        this.package = "(package unknown)";
        this.version = "(version unknown)";
        this.service = eref.nativeElement.getAttribute("service");
    }
    RbIdentity.prototype.ngAfterViewInit = function () {
        var that = this;
        this.service && this.http.get("/" + that.service + "/identity")
            .toPromise()
            .then(function (res) {
            var json = res.json();
            that.package = json.package || that.package;
            that.version = json.version || that.version;
        })
            .catch(function (err) { return console.log("err", err); });
    };
    return RbIdentity;
}());
RbIdentity.instances = 0;
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RbIdentity.prototype, "service", void 0);
RbIdentity = RbIdentity_1 = __decorate([
    core_1.Component({
        selector: 'rb-identity',
        template: "\n        <div class=\"rb-component rb-identity\">\n            <table>\n                <tr><th>Component:</th><td>&lt;{{name}}&gt; #{{instance}}</td></tr>\n                <tr><th>Package:</th><td>{{package}}@{{version}}</td></tr>\n                <tr><th>Description:</th><td>Displays REST response for <code>/{{service || \"NO-SERVICE\"}}/identity</code></td></tr>\n            </table>\n        </div>\n        ",
        styles: ["\n        .rb-component {\n            padding: 5pt;\n            border-radius: 5px;\n            border: 1pt solid #555;\n            background-color: #eee;\n            font-family: Verdata,sans-serif;\n            }\n        th {\n            text-align: left;\n        }\n    "],
        providers: [],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, http_1.Http])
], RbIdentity);
exports.RbIdentity = RbIdentity;
var RbIdentity_1;
//# sourceMappingURL=rb-identity.component.js.map