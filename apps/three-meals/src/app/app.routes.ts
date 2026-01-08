import { Route } from '@angular/router';
import { MealsTrackerPageComponent } from '@mtrybus/feature-meals-tracker-page';
import { FeatureMealsDashboardComponent } from '@mtrybus/three-meals/feature-meals-dashboard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: FeatureMealsDashboardComponent,
  },
  {
    path: 'meals-tracker',
    component: MealsTrackerPageComponent,
  },
];
