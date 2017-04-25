import { Component } from '@angular/core';

@Component({
  selector: 'REST-BUNDLE-ui',
  template: `<div class="rb-root"><h1>&lt;{{name}}&gt;</h1>{{date}}</div>`,
})
export class AppComponent  { 
    name = 'REST-BUNDLE-ui'; 
    date = new Date();
    constructor() {
        setInterval(() => (this.date = new Date()), 1000);
    }
}
