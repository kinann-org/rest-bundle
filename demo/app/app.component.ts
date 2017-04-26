import { Component } from '@angular/core';

@Component({
  selector: 'demo-ui',
  template: `<div class="demo-ui">demo-ui AppComponent {{seconds}}</div>`,
})
export class AppComponent  { 
    name = 'demo-ui'; 
    seconds = 0;
    constructor() {
        setInterval(() => (this.seconds++), 1000);
    }
}
