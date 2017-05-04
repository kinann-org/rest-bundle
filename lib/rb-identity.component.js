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
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
let RbIdentity = RbIdentity_1 = class RbIdentity {
    constructor(eref, http) {
        this.http = http;
        this.instance = ++RbIdentity_1.instances;
        this.name = 'rb-identity';
        this.package = "(package unknown)";
        this.version = "(version unknown)";
        this.service = eref.nativeElement.getAttribute("service");
    }
    ngAfterViewInit() {
        var that = this;
        this.service && this.http.get("/" + that.service + "/identity")
            .toPromise()
            .then((res) => {
            var json = res.json();
            that.package = json.package || that.package;
            that.version = json.version || that.version;
        })
            .catch((err) => console.log("err", err));
    }
};
RbIdentity.instances = 0;
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RbIdentity.prototype, "service", void 0);
RbIdentity = RbIdentity_1 = __decorate([
    core_1.Component({
        selector: 'rb-identity',
        template: `
        <div class="rb-component rb-identity">
            <table>
                <tr><th>Component:</th><td>&lt;{{name}}&gt; #{{instance}}</td></tr>
                <tr><th>Package:</th><td>{{package}}@{{version}}</td></tr>
                <tr><th>Description:</th><td>Displays REST response for <code>/{{service || "NO-SERVICE"}}/identity</code></td></tr>
            </table>
        </div>
        `,
        styles: [`
        .rb-component {
            padding: 5pt;
            border-radius: 5px;
            border: 1pt solid #555;
            background-color: #eee;
            font-family: Verdata,sans-serif;
            }
        th {
            text-align: left;
        }
    `],
        providers: [],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, http_1.Http])
], RbIdentity);
exports.RbIdentity = RbIdentity;
var RbIdentity_1;
//# sourceMappingURL=rb-identity.component.js.map