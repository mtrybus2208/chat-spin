import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Option } from '@mtrybus/ui';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { ChatWebSocketService } from '@mtrybus/data-access-chat';
import { Router } from '@angular/router';

export interface IProfileConfigFormGroup {
  gender?: FormControl<Option | null>;
  preferences: FormControl<string | null>;
}

@Component({
  selector: 'lib-profile-configuration',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    LottieComponent,
  ],
  templateUrl: './profile-configuration.component.html',
  styleUrl: './profile-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileConfigurationComponent {
  public readonly options: Option[] = [
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
  public result = '';
  public lottieOptions: AnimationOptions = {
    path: '/assets/chat-spin/images/logo.json',
    loop: true,
  };

  private readonly chatWebSocketService = inject(ChatWebSocketService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly form = inject(FormBuilder).group<IProfileConfigFormGroup>({
    preferences: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    gender: new FormControl<Option | null>(null, {
      validators: [Validators.required],
    }),
  });

  connectHandler(): void {
    this.router.navigate(['/chat']);
  }

  getResult(): void {
    const formValue = this.form.value;

    this.result = `gender is: ${formValue.gender}`;
  }
}
