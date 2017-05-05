import { 
    NgModule, 
    ModuleWithProviders  //TODO: Remove this
}      from '@angular/core';
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
    exports: [
        RbIdentity,
    ],
    providers: [
    ],
    bootstrap:    [ 
        RbIdentity, // top-level component
        RbIndexLinks,  // top-level component
    ]
})
export class RbModule { 
    public static forRoot(): ModuleWithProviders { // TODO: remove this
        return {
            ngModule: RbModule,
            providers: [ ],
        };
    }
}
