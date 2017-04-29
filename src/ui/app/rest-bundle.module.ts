import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RestBundleComponent }  from './rest-bundle.component';
import { RestBundleService }  from './rest-bundle.service';
import { IndexLinkComponent }  from './index-link.component';

@NgModule({
    imports:      [ 
        BrowserModule, 
        FormsModule, 
        HttpModule,
    ],
    declarations: [ 
        RestBundleComponent, 
        IndexLinkComponent,
    ],
    providers: [
        RestBundleService ,
    ],
    bootstrap:    [ 
        RestBundleComponent, // top-level component
        IndexLinkComponent,  // top-level component
    ]
})
export class RestBundleModule { }
