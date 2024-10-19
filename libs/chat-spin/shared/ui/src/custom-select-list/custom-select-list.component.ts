import {
  Component,
  EventEmitter,
  input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Option, CustomSelect } from '../interfaces';

@Component({
  selector: 'lib-custom-select-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select-list.component.html',
  styleUrl: './custom-select-list.component.scss',
})
export class CustomSelectListComponent implements CustomSelect {
  @ViewChild('selectListWrapper')
  templateRef!: TemplateRef<unknown>;

  @Output() closed = new EventEmitter<void>();
}
