import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureDashboardComponent } from '@mtrybus/feature-dashboard';
import { BaseLayoutComponent } from '@mtrybus/ui';

@Component({
  imports: [RouterModule, FeatureDashboardComponent, BaseLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-spin';
}
