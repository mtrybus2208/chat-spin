import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';

import {
  timeIntervalValidator,
  uniqueMealTimesValidator,
} from '@mtrybus/meals/utils-meals';
import { MealsCounterComponent } from '../components';

@Component({
  selector: 'lib-feature-meals-dashboard',
  imports: [
    MealsCounterComponent,
    ReactiveFormsModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule,
    InputNumberModule,
    FluidModule,
    NgTemplateOutlet,
    DividerModule,
    MessageModule,
  ],
  templateUrl: './feature-meals-dashboard.component.html',
  styleUrl: './feature-meals-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMealsDashboardComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly mealsCounter = signal<number>(0);

  readonly showMealsHintDescription = signal<boolean>(false);

  constructor() {
    effect(() => {
      const counter = this.mealsCounter();

      this.mealsControls.clear();

      if (counter > 0) {
        for (let i = 0; i < counter; i++) {
          const defaultDate = new Date();
          defaultDate.setHours(8 + i, 0, 0, 0);

          this.mealsControls.push(
            this.formBuilder.control(defaultDate, [timeIntervalValidator(15)])
          );
        }
      } else {
        this.mealsControls.clear();
      }
    });
  }

  readonly mealForm = this.formBuilder.group({
    meals: this.formBuilder.array([], [uniqueMealTimesValidator()]),
  });

  get mealsControls(): FormArray {
    return this.mealForm.controls.meals;
  }

  readonly date = signal<Date | null>(null);

  onCounterChange(counter: number): void {
    this.mealsCounter.set(counter);
  }

  onSubmit(): void {
    console.log({ form: this.mealForm.value });
  }

  onHintToogle(): void {
    this.showMealsHintDescription.set(!this.showMealsHintDescription());
  }
}
