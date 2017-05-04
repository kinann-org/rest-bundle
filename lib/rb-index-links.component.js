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
const core_1 = require("@angular/core");
let RbIndexLinks = class RbIndexLinks {
    constructor(eref) {
        this.service = '?service?';
        this.index = '?index?';
        this.index = eref.nativeElement.getAttribute("index") || "expected attribute:index";
        this.service = eref.nativeElement.getAttribute("service") || "expected attribute:service";
    }
};
RbIndexLinks = __decorate([
    core_1.Component({
        selector: 'rb-index-links',
        styles: [`
    `],
        template: `
        <div classs='rb-index-links'>
            <h1>/{{service}}/ui/index-{{index}}</h1>
            This is the home page for the "{{service}}" REST service.
            The home page is available in different configurations:

            <ul>
                <li><a href="index-jit">JIT Development</a> uses JIT (runtime) compiled Angular components 
                <li><a href="index-aot">AOT Development</a> uses AOT pre-compiled Angular components 
                <li><a href="index-dist">Production</a> uses WebPack-ed AOT pre-compiled Angular components
            </ul>

            Each RestBundle instance provides a named Node.js REST service bound with matching Angular Components.
            For example, below is a service component that displays identity information returned
            by the "{{service}}" REST service:
        </div>
    `,
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], RbIndexLinks);
exports.RbIndexLinks = RbIndexLinks;
//# sourceMappingURL=rb-index-links.component.js.map