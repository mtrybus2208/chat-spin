import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'lib-meals-tracker-page',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './meals-tracker-page.component.html',
  styleUrls: ['./meals-tracker-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsTrackerPageComponent {
  readonly today = signal(new Date());
}
