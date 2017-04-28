import { Component } from '@angular/core';
import { RestBundleService } from './rest-bundle.service';

@Component({
    selector: 'rest-bundle-ui',
    template: `<div class="rb-root"><h1>&lt;{{name}}&gt; /{{rest.name}}</h1>{{date}}</div>`,
    styleUrls: ['./rest-bundle.module.css'],
    providers: [ RestBundleService ],
})
export class RestBundleComponent  { 
    name = 'rest-bundle-ui'; 
    date = new Date();
    rest :RestBundleService;
    constructor(public rbs:RestBundleService) {
        this.rest = rbs;
        setInterval(() => (this.date = new Date()), 1000);
    }
}
