import { platformBrowser }    from '@angular/platform-browser';
import { RestBundleModuleNgFactory } from '../aot/app/rest_bundle.module.ngfactory';

console.log("AOT compiled");
platformBrowser().bootstrapModuleFactory(RestBundleModuleNgFactory);
