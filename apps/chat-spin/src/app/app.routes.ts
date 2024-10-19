import { Route } from '@angular/router';
import { FeatureDashboardComponent } from '@mtrybus/feature-dashboard';
import { PageNotFoundComponent } from '@mtrybus/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    component: FeatureDashboardComponent,
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
