import { Component } from '@angular/core';

@Component({
  selector: 'REST_BUNDLE-ui',
  template: `<div class="rb-root"><h1>&lt;{{name}}&gt;</h1>{{date}}</div>`,
})
export class AppComponent  { 
    name = 'REST_BUNDLE-ui'; 
    date = new Date();
    constructor() {
        setInterval(() => (this.date = new Date()), 1000);
    }
}
