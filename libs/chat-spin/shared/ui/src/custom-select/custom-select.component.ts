import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomSelectTriggerForDirective } from './custom-select-trigger-for.directive';
import { CustomSelectListComponent } from '../custom-select-list/custom-select-list.component';
import { CustomSelectOptionComponent } from '../custom-select-option/custom-select-option.component';
import { Option } from '../interfaces';

@Component({
  selector: 'lib-custom-select',
  standalone: true,
  imports: [
    CommonModule,
    CustomSelectTriggerForDirective,
    CustomSelectListComponent,
    CustomSelectOptionComponent,
  ],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
  host: {},
})
export class CustomSelectComponent implements ControlValueAccessor {
  label = input('Select label');
  formControlName = input('');
  options = input<Option[]>([]);
  placeholder = input('Select an option...');

  // isSelectOpen = false;
  value: string | null = null;

  writeValue(value: string): void {
    this.value = value;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (value: string) => {};
  onTouched = () => {};

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    console.log('setDisabledState');
  }

  openDropdown() {
    console.log('open');
  }

  destroyDropdown() {
    console.log('close');
    // this.isSelectOpen = false;
  }

  toggleDropdown(event: any) {
    console.log({ event });
    // this.isSelectOpen = !this.isSelectOpen;
  }

  selectOption(option: { value: string; label: string }): void {
    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();
    this.destroyDropdown();
  }
}

// !!!!!wazne zrob pozniej z cdk zeby zamykalo naokoklo
// https://medium.com/codeshakeio/build-a-dropdown-component-using-angular-cdk-fa45455e6a73

// https://blog.bitsrc.io/how-ive-created-reusable-select-in-angular-16-574b9fb89e37
