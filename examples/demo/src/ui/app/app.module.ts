import { NgModule }      from '@angular/core';
import { HttpModule }      from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

//import { RbModule } from 'rest-bundle/components';
import { RbIdentity } from 'rest-bundle/components';

import { AppComponent }  from './app.component';

@NgModule({
    imports:      [ 
        BrowserModule,
        HttpModule,
//        RbModule,
    ],
    declarations: [ 
        RbIdentity,
        AppComponent,
    ],
    bootstrap:    [  // top-level
        AppComponent, // must come first
        //RbIdentity,  // imported library Components cannot be top-level
    ]
})
export class AppModule { 
}
