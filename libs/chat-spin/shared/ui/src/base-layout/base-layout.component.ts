import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { DesktopMenuComponent } from '../desktop-menu/desktop-menu.component';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'lib-base-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule,
    MobileMenuComponent,
    DesktopMenuComponent,
    LottieComponent,
  ],
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

  public lottieOptions: AnimationOptions = {
    path: '/assets/chat-spin/images/logo.json',
    loop: false,
  };

  activeLink = this.links[0];
}
