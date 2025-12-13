import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LandingPageComponent } from '@mtrybus/feature-landing-page';
import { BaseLayoutComponent } from '@mtrybus/ui';

@Component({
  imports: [RouterModule, BaseLayoutComponent, LandingPageComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-spin';
}
