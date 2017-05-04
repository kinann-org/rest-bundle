import { platformBrowser }    from '@angular/platform-browser';
import { RbModuleNgFactory } from '../aot/app/rb.module.ngfactory';

console.log("AOT compiled");
platformBrowser().bootstrapModuleFactory(RbModuleNgFactory);
