import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SettingsFormFacadeService } from '@mtrybus/feature-user-settings';
import { LocalStorageService } from '@mtrybus/utils';

import { MealItem } from '../meal-item';

interface MealItemData {
  time: Date;
  name: string;
}

@Component({
  selector: 'lib-meals-tracker-page',
  imports: [DatePipe, MealItem],
  templateUrl: './meals-tracker-page.component.html',
  styleUrls: ['./meals-tracker-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsTrackerPageComponent {
  private readonly settingsFormFacade = inject(SettingsFormFacadeService);
  private readonly localStorageService = inject(LocalStorageService);

  readonly mealsFromStorage = signal<{ meals: string[] }>(
    this.localStorageService.getItem<{ meals: string[] }>('meals') || {
      meals: [],
    }
  );

  readonly today = signal(new Date());

  constructor() {
    console.log({ meals: this.mealsFromStorage() });
  }

  readonly mealsItems = computed(() => {
    console.log({ mealsSTORAGEEEEEEE: this.mealsFromStorage() });
    return this.mealsFromStorage().meals.map((meal, idx) => {
      return {
        time: new Date(meal || ''),
        name: `Meal ${idx + 1}`,
      };
    });
  });
}
