import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Option } from '../interfaces';

@Component({
  selector: 'lib-custom-select-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select-option.component.html',
  styleUrl: './custom-select-option.component.scss',
})
export class CustomSelectOptionComponent {
  // przerob na pojedyncza input
  value = input<Option>();
}
