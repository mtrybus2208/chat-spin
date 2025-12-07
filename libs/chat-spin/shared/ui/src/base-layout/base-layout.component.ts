import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { DesktopMenuComponent } from '../desktop-menu/desktop-menu.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'lib-base-layout',
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
      label: 'Home',
    },
    {
      value: 'about',
      label: 'About',
    },
    {
      value: 'chat',
      label: 'Chat',
    },
    {
      value: 'support',
      label: 'Support',
    },
  ];

  public lottieOptions: AnimationOptions = {
    path: '/assets/chat-spin/images/logo.json',
    loop: false,
  };

  activeLink = this.links[0];
}
