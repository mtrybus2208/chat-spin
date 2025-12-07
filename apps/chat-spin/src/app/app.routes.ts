import { Route } from '@angular/router';

import { LandingPageComponent } from '@mtrybus/feature-landing-page';
import { PageNotFoundComponent } from '@mtrybus/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'dashboard',
    component: LandingPageComponent,
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('@mtrybus/feature-chat').then((m) => m.FeatureChatComponent),
  },
  {
    path: 'information',
    loadComponent: () =>
      import('@mtrybus/feature-information').then(
        (m) => m.FeatureInformationComponent
      ),
  },

  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

// https://www.angulararchitects.io/en/blog/routing-and-lazy-loading-with-standalone-components/
