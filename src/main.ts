import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare var jQuery: any;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// tslint:disable-next-line:only-arrow-functions
jQuery('body').niceScroll({
  cursorcolor: '#3498db',
  cursorwidth: '1px',
  cursorborder: '1px solid #3498db',
});
