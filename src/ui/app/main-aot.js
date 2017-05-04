import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';
console.log("AOT compiled");
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main-aot.js.map