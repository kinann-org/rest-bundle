import { Component } from '@angular/core';

@Component({
    selector: 'demo-ui',
    styles: [`
        .demo-ui {
            padding: 5pt;
            border-radius: 5px;
            border: 1pt solid #5a5;
            background-color: #efe;
            font-family: Arial, Helvetica, sans-serif;
        }
        h1 {
            color: #369;
            font-size: 125%;
        }
    `],// styles
    template: `
        <div class="demo-ui">
            <h1>Demo application root component {{seconds}}</h1>
            This application component includes the library component &lt;rest-bundle-identity&gt;:
            <div *ngFor='let srv of ["greeting","aloha"]'>
                {{srv}}
                <rest-bundle-identity [service]="srv">
                    Loading RestBundleIdentityComponent content here ...
                </rest-bundle-identity>
            </div>
            two:
            <rest-bundle-identity service="aloha">
                Loading RestBundleIdentityComponent content here ...
            </rest-bundle-identity>
        </div>
    `,// template
})
export class AppComponent  { 
    name = 'demo-ui'; 
    seconds = 0;
    constructor() {
        setInterval(() => (this.seconds++), 1000);
    }
}
