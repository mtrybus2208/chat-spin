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
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';

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
  ],
  templateUrl: './feature-meals-dashboard.component.html',
  styleUrl: './feature-meals-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMealsDashboardComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly mealsCounter = signal<number>(0);

  constructor() {
    effect(() => {
      const counter = this.mealsCounter();

      this.mealsControls.clear();

      if (counter > 0) {
        for (let i = 0; i < counter; i++) {
          this.mealsControls.push(this.formBuilder.control(''));
        }
      } else {
        this.mealsControls.clear();
      }
    });
  }

  readonly mealForm = this.formBuilder.group({
    meals: this.formBuilder.array([]),
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
}
