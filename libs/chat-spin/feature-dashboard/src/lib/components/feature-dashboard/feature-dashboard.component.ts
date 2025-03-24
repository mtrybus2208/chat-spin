import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '@mtrybus/util-directives';
import { ProfileConfigurationComponent } from '../profile-configuration/profile-configuration.component';

@Component({
  selector: 'lib-feature-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    HighlightDirective,
    ProfileConfigurationComponent,
  ],
  templateUrl: './feature-dashboard.component.html',
  styleUrl: './feature-dashboard.component.scss',
})
export class FeatureDashboardComponent {}
