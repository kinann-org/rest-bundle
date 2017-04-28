import { platformBrowser }    from '@angular/platform-browser';
import { RestBundleModuleNgFactory } from '../aot/app/rest-bundle.module.ngfactory';

console.log("AOT compiled");
platformBrowser().bootstrapModuleFactory(RestBundleModuleNgFactory);
