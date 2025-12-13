import { Component, input, signal } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-mobile-menu',
  imports: [RouterModule],
  templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent {
  readonly links = input<{ value: string; label: string }[]>([]);
}
