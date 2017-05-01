import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { RestBundleIdentityComponent }  from './rest-bundle-identity.component';
import { IndexLinkComponent }  from './index-link.component';

@NgModule({
    imports:      [ 
        BrowserModule, 
        HttpModule,
    ],
    declarations: [ 
        RestBundleIdentityComponent, 
        IndexLinkComponent,
    ],
    providers: [
    ],
    bootstrap:    [ 
        RestBundleIdentityComponent, // top-level component
        IndexLinkComponent,  // top-level component
    ]
})
export class AppModule { }
