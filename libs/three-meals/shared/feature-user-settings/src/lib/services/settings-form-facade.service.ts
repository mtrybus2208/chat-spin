import { Injectable } from '@angular/core';
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

import { Router } from '@angular/router';
import {
  timeIntervalValidator,
  uniqueMealTimesValidator,
} from '@mtrybus/meals/utils-meals';

@Injectable({
  providedIn: 'root',
})
export class SettingsFormFacadeService {
  private readonly formBuilder = inject(FormBuilder);

  readonly mealForm = this.formBuilder.group({
    meals: this.formBuilder.array([], [uniqueMealTimesValidator()]),
  });

  get mealsControls(): FormArray {
    return this.mealForm.controls.meals;
  }
}
