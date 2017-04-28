import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RestBundleComponent }  from './rest_bundle.component';
import { IndexLinkComponent }  from './index_link.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ RestBundleComponent, IndexLinkComponent ],
  bootstrap:    [ RestBundleComponent, IndexLinkComponent ]
})
export class RestBundleModule { }
