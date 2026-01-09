import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SettingsFormFacadeService } from '@mtrybus/feature-user-settings';

import { MealItem } from '../meal-item';

@Component({
  selector: 'lib-meals-tracker-page',
  imports: [DatePipe, MealItem],
  templateUrl: './meals-tracker-page.component.html',
  styleUrls: ['./meals-tracker-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsTrackerPageComponent {
  private readonly settingsFormFacade = inject(SettingsFormFacadeService);

  readonly today = signal(new Date());

  readonly mealsControls = this.settingsFormFacade.mealsControls;

  protected readonly mealItems = computed(() => {
    return this.mealsControls.controls.map((control, index) => {
      return {
        time: control.value,
        name: `Meal ${index + 1}`,
      };
    });
  });
}
