import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  CustomSelectComponent,
  CustomSelectTriggerForDirective,
} from '@mtrybus/ui';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'lib-profile-configuration',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    CustomSelectComponent,
    ReactiveFormsModule,
    CustomSelectTriggerForDirective,
  ],
  templateUrl: './profile-configuration.component.html',
  styleUrl: './profile-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileConfigurationComponent implements OnInit {
  readonly options = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Woman',
      value: 'woman',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ];
  result = '';

  readonly form = inject(FormBuilder).group({
    gender: ['', Validators.required],
    preferences: ['', Validators.required],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('zmiana wartosci');
      console.log({
        value,
      });
    });
  }

  getResult() {
    const formValue = this.form.value;
    console.log({
      formValue,
    });

    this.result = `gender is: ${formValue.gender}`;
  }
}
