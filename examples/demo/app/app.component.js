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
var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.name = 'demo-ui';
        this.seconds = 0;
        setInterval(function () { return (_this.seconds++); }, 1000);
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'demo-ui',
        styles: ["\n        .demo-ui {\n            padding: 5pt;\n            border-radius: 5px;\n            border: 1pt solid #5a5;\n            background-color: #efe;\n            font-family: Arial, Helvetica, sans-serif;\n        }\n        h1 {\n            color: #369;\n            font-size: 125%;\n        }\n    "],
        template: "\n        <div class=\"demo-ui\">\n            <h1>Demo application root component {{seconds}}</h1>\n            This application component includes the &lt;rest-bundle-identity&gt; library component for each\n            available REST service:\n                <rest-bundle-identity [service]=\"greeting\">\n                    Loading RestBundleIdentityComponent content here ...\n                </rest-bundle-identity>\n            <div *ngFor='let srv of [\"greeting\",\"aloha\"]'>\n                <strong>REST service:</strong> {{srv}}\n                <rest-bundle-identity [service]=\"srv\">\n                    Loading RestBundleIdentityComponent content here ...\n                </rest-bundle-identity>\n            </div>\n                <!--\n            -->\n        </div>\n    ",
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map