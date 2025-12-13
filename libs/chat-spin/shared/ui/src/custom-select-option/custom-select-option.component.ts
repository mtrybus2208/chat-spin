import { Highlightable } from '@angular/cdk/a11y';
import {
  booleanAttribute,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';


import { Option } from '../interfaces';

@Component({
  selector: 'lib-custom-select-option',
  imports: [],
  templateUrl: './custom-select-option.component.html',
  host: {
    '[class.active]': 'active',
    '[class.disabled]': 'disabled',
  },
})
export class CustomSelectOptionComponent implements Highlightable {
  public option = input<Option>();
  public isDisabled = input(false, {
    transform: booleanAttribute,
    alias: 'disabled',
  });
  public active = signal(false);
  public optionRef = viewChild<ElementRef<HTMLElement>>('optionRef');

  setActiveStyles(): void {
    this.active.set(true);
  }

  setInactiveStyles(): void {
    this.active.set(false);
  }

  scrollIntoView(): void {
    this.optionRef()?.nativeElement.scrollIntoView({ block: 'center' });
  }

  getOptionElement(): HTMLElement | undefined {
    return this.optionRef()?.nativeElement;
  }
}
