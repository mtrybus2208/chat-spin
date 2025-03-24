import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-desktop-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './desktop-menu.component.html',
})
export class DesktopMenuComponent {
  readonly links = input<{ value: string; label: string }[]>([]);
}
