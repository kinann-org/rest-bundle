import { Component, ElementRef, OnChanges, OnInit, AfterViewInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
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
    providers: [ ],
})
export class RbIdentity implements AfterViewInit { 
    static instances = 0;
    @Input() service :string;

    instance = ++RbIdentity.instances;
    name = 'rb-identity'; 
    package = "(package unknown)";
    version = "(version unknown)";
    constructor(eref:ElementRef, public http:Http) {
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
            .catch((err:any) => console.log("err", err));
    }
}
