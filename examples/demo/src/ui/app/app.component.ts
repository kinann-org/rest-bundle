import { Component } from '@angular/core';
import { RbIdentity } from 'rest-bundle/components';

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
        h3 {
            color: #369;
            font-size: 110%;
        }
    `],// styles
    template: `
        <div class="demo-ui">
            <dt>&lt;demo-ui&gt;</dt>
            <dd>
            This application root component includes the &lt;rb-identity&gt; library component for each
            available REST service:
            <div *ngFor='let srv of ["greeting","aloha"]'>
                <rb-identity service="{{srv}}">
                    Loading RestBundleIdentityComponent content here ...
                </rb-identity>
            </div>
            </dd>
        </div>
    `,// template
})
export class AppComponent  { 
    name = 'demo-ui'; 
    constructor() {
    }
}
