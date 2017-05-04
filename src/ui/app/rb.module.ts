import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { RbIdentity }  from './rb-identity.component';
import { RbIndexLinks }  from './rb-index-links.component';

@NgModule({
    imports:      [ 
        BrowserModule, 
        HttpModule,
    ],
    declarations: [ 
        RbIdentity, 
        RbIndexLinks,
    ],
    providers: [
    ],
    bootstrap:    [ 
        RbIdentity, // top-level component
        RbIndexLinks,  // top-level component
    ]
})
export class RbModule { }
