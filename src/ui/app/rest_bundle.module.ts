import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RestBundleComponent }  from './rest_bundle.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ RestBundleComponent ],
  bootstrap:    [ RestBundleComponent ]
})
export class RestBundleModule { }
