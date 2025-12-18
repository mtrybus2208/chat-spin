import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
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
  ],
  templateUrl: './feature-meals-dashboard.component.html',
  styleUrl: './feature-meals-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMealsDashboardComponent {
  private readonly formbuilder = inject(FormBuilder);

  readonly form = this.formbuilder.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    age: ['', Validators.required],
  });

  readonly date = signal<Date | null>(null);

  onCounterChange(counter: number): void {
    console.log({ counter });
  }

  onSubmit(): void {
    console.log({ form: this.form.value });
  }
}
