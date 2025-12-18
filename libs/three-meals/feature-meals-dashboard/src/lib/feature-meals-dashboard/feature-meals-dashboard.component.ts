import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MealsCounterComponent } from '../components';

@Component({
  selector: 'lib-feature-meals-dashboard',
  imports: [MealsCounterComponent],
  templateUrl: './feature-meals-dashboard.component.html',
  styleUrl: './feature-meals-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMealsDashboardComponent {
  onCounterChange(counter: number): void {
    console.log({ counter });
  }
}
