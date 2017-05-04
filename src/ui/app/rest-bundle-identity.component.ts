import { Component, ElementRef, OnChanges, OnInit, AfterViewInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'rest-bundle-identity',
    template: `
        <div class="rb-root">
            <table>
                <caption>&lt;{{name}}&gt; #{{inst}}</caption>
                <tr><th>Description:</th><td>{{description}}</td></tr>
                <tr><th>REST Service:</th><td>/{{service}}/identity</td></tr>
                <tr><th>Package:</th><td>{{package}}</td></tr>
                <tr><th>Version:</th><td>{{version}}</td></tr>
                <tr><th>Date:</th><td>{{date}}</td></tr>
            </table>
        </div>
        `,
    styles: [`
        .rb-root {
            padding: 5pt;
            border-radius: 5px;
            border: 1pt solid #555;
            background-color: #eee;
            font-family: Verdata,sans-serif;
        }
        th {
            text-align: left;
        }
        caption {
            font-weight: 700;
            font-size: 110%;
            color: #339;
            text-align: left;
        }
    `],
    providers: [ ],
})
export class RestBundleIdentityComponent implements AfterViewInit { 
    static rbicInst = 0;
    @Input() service :string;
    @Input() description = "";

    inst = ++RestBundleIdentityComponent.rbicInst;
    name = 'rest-bundle-identity'; 
    date = new Date();
    package = "(package unknown)";
    version = "(version unknown)";
    constructor(eref:ElementRef, public http:Http) {
        this.service = eref.nativeElement.getAttribute("service");
        this.description = eref.nativeElement.getAttribute("description") || this.description;
        setInterval(() => (this.date = new Date()), 1000);
    }
    ngAfterViewInit() {
        console.log("ngAfterViewInit", this.inst, this.service);
        var that = this;
        this.service && this.http.get("/" + that.service + "/identity")
            .toPromise()
            .then((res) => {
                var json = res.json();
                that.package = json.package || that.package;
                that.version = json.version || that.version;
            })
            .catch((err:any) => console.log("err", err));
    }
}
