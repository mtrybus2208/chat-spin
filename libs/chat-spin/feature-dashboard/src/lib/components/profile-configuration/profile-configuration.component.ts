import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  CustomSelectComponent,
  CustomSelectTriggerForDirective,
  Option,
} from '@mtrybus/ui';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { ChatWebSocketService } from '@mtrybus/data-access-chat';

export interface IProfileConfigFormGroup {
  gender?: FormControl<Option | null>;
  preferences: FormControl<string | null>;
}

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
    LottieComponent,
  ],
  templateUrl: './profile-configuration.component.html',
  styleUrl: './profile-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileConfigurationComponent implements OnInit {
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
    loop: false,
  };

  private readonly chatWebSocketService = inject(ChatWebSocketService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly form = inject(FormBuilder).group<IProfileConfigFormGroup>({
    preferences: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    gender: new FormControl<Option | null>(null, {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('zmiana wartosci');
      console.log({
        ZMIANA22222: value,
        value,
      });
    });
  }

  connectHandler() {
    this.chatWebSocketService.connect();
  }

  getResult() {
    const formValue = this.form.value;
    console.log({
      formValue,
    });

    this.result = `gender is: ${formValue.gender}`;
  }
}
