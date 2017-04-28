import { Component } from '@angular/core';

@Component({
    selector: 'rest-bundle-ui',
    template: `<div class="rb-root"><h1>&lt;{{name}}&gt;</h1>{{date}}</div>`,
    styleUrls: ['./rest_bundle.module.css'],
})
export class RestBundleComponent  { 
    name = 'rest-bundle-ui'; 
    date = new Date();
    constructor() {
        setInterval(() => (this.date = new Date()), 1000);
    }
}
