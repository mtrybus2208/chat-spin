import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FeatureDashboardComponent } from '@mtrybus/feature-dashboard';
import { BaseLayoutComponent } from '@mtrybus/ui';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    FeatureDashboardComponent,
    BaseLayoutComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-spin';
}
