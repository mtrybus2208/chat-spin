import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from '@mtrybus/util-config';

import { ProfileConfigurationComponent } from '../profile-configuration/profile-configuration.component';

@Component({
  selector: 'lib-feature-dashboard',
  imports: [CommonModule, FormsModule, ProfileConfigurationComponent],
  templateUrl: './feature-dashboard.component.html',
  styleUrl: './feature-dashboard.component.scss',
})
export class FeatureDashboardComponent {
  appConfig = inject(APP_CONFIG);
}
