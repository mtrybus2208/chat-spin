import { ChangeDetectionStrategy, Component } from '@angular/core';

import { effect, signal } from '@angular/core';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'lib-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel);
  constructor() {
    effect(() => {
      const formValue = this.loginForm();
      console.log({ formValue });
    });
  }
}
