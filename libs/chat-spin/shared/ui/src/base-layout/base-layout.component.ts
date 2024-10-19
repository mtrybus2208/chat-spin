import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-base-layout',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterModule],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {
  readonly links = [
    {
      value: '',
      label: 'Dashboard',
    },
    {
      value: 'chat',
      label: 'Chat',
    },
    {
      value: 'information',
      label: 'Information',
    },
  ];

  activeLink = this.links[0];
}
