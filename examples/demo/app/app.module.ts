import { NgModule }      from '@angular/core';
import { HttpModule }      from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { RestBundleIdentityComponent } from 'rest-bundle/components';

import { AppComponent }  from './app.component';

@NgModule({
    imports:      [ 
        BrowserModule,
        HttpModule,
    ],
    declarations: [ 
        AppComponent,
        RestBundleIdentityComponent,
    ],
    bootstrap:    [ 
        AppComponent,
    //    RestBundleIdentityComponent,
    ]
})
export class AppModule { 
}
