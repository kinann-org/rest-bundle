import { NgModule }      from '@angular/core';
import { HttpModule }      from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { RbModule } from 'rest-bundle/components';

import { AppComponent }  from './app.component';

@NgModule({
    imports:      [ 
        BrowserModule,
        HttpModule,
        RbModule,
    ],
    declarations: [ 
        AppComponent,
    ],
    bootstrap:    [  // top-level
        AppComponent, 
    ]
})
export class AppModule { 
}
