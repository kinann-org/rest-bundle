import { Component, ElementRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'rest-bundle-identity',
    template: `
        <div class="rb-root">
            <table>
                <caption>&lt;{{name}}&gt;</caption>
                <tr><th>Description:</th><td>{{description}}</td></tr>
                <tr><th>Service:</th><td>{{service}}/identity</td></tr>
                <tr><th>Package:</th><td>{{package}}</td></tr>
                <tr><th>Version:</th><td>{{version}}</td></tr>
                <tr><th>Date:</th><td>{{date}}</td></tr>
            </table>
        </div>
        `,
    styleUrls: ['./rest-bundle.module.css'],
    providers: [ ],
})
export class RestBundleIdentityComponent implements OnInit { 
    name = 'rest-bundle-identity'; 
    date = new Date();
    package = "(package unknown)";
    version = "(version unknown)";
    service = "/UNKNOWN";
    description = "";
    constructor(eref:ElementRef, public http:Http) {
        this.service = "/" + eref.nativeElement.getAttribute("service") || "expected attribute:service";
        this.description = eref.nativeElement.getAttribute("description") || this.description;
        setInterval(() => (this.date = new Date()), 1000);
    }
    ngOnInit() {
        console.log("ngOnInit");
        this.http.get(this.service + "/identity")
            .toPromise()
            .then((res) => {
                var json = res.json();
                this.package = json.package || this.package;
                this.version = json.version || this.version;
            })
            .catch((err:any) => console.log("err", err));
    }
}
