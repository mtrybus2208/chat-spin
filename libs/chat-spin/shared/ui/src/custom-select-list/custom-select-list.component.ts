import { Component, output, TemplateRef, ViewChild } from '@angular/core';


import { CustomSelect } from '../interfaces';

@Component({
  selector: 'lib-custom-select-list',
  imports: [],
  templateUrl: './custom-select-list.component.html',
})
export class CustomSelectListComponent implements CustomSelect {
  @ViewChild('selectListWrapper')
  templateRef!: TemplateRef<unknown>;

  public readonly closed = output<void>();
}
