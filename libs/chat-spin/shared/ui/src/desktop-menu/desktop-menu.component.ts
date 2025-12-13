import { Component, input } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-desktop-menu',
  imports: [RouterModule],
  templateUrl: './desktop-menu.component.html',
})
export class DesktopMenuComponent {
  readonly links = input<{ value: string; label: string }[]>([]);
}
