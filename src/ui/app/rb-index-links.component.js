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
var RbIndexLinks = (function () {
    function RbIndexLinks(eref) {
        this.service = '?service?';
        this.index = '?index?';
        this.index = eref.nativeElement.getAttribute("index") || "expected attribute:index";
        this.service = eref.nativeElement.getAttribute("service") || "expected attribute:service";
    }
    return RbIndexLinks;
}());
RbIndexLinks = __decorate([
    core_1.Component({
        selector: 'rb-index-links',
        styles: ["\n    "],
        template: "\n        <div classs='rb-index-links'>\n            <h1>/{{service}}/ui/index-{{index}}</h1>\n            This is the home page for the \"{{service}}\" REST service.\n            The home page is available in different configurations:\n\n            <ul>\n                <li><a href=\"index-jit\">JIT Development</a> uses JIT (runtime) compiled Angular components \n                <li><a href=\"index-aot\">AOT Development</a> uses AOT pre-compiled Angular components \n                <li><a href=\"index-dist\">Production</a> uses WebPack-ed AOT pre-compiled Angular components\n            </ul>\n\n            Each RestBundle instance provides a named Node.js REST service bound with matching Angular Components.\n            For example, below is a service component that displays identity information returned\n            by the \"{{service}}\" REST service:\n        </div>\n    ",
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], RbIndexLinks);
exports.RbIndexLinks = RbIndexLinks;
//# sourceMappingURL=rb-index-links.component.js.map