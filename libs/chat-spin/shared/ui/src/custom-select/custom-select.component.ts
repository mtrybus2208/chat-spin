import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomSelectTriggerForDirective } from './custom-select-trigger-for.directive';
import { CustomSelectListComponent } from '../custom-select-list/custom-select-list.component';
import { CustomSelectOptionComponent } from '../custom-select-option/custom-select-option.component';
import { Option } from '../interfaces';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

import { AbstractValueAccessor } from '../classes/value-accessor.abstract';
@Component({
  selector: 'lib-custom-select',
  imports: [
    CommonModule,
    CustomSelectTriggerForDirective,
    CustomSelectListComponent,
    CustomSelectOptionComponent,
  ],
  templateUrl: './custom-select.component.html',
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
export class CustomSelectComponent
  extends AbstractValueAccessor<Option>
  implements ControlValueAccessor, AfterViewInit
{
  public label = input('');
  public hint = input('');
  public formControlName = input('');
  public options = input<Option[]>([]);
  public placeholder = input('Select an option...');
  public optionItems = viewChildren(CustomSelectOptionComponent);
  public selectTriggerRef =
    viewChild<CustomSelectTriggerForDirective>('selectTriggerRef');

  private keyManager!: ActiveDescendantKeyManager<CustomSelectOptionComponent>;
  private selectedOption!: CustomSelectOptionComponent;
  private lastKeyPressed = '';
  private keyPressIndex = 0;

  ngAfterViewInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.optionItems())
      .withHomeAndEnd()
      .withWrap()
      .withPageUpDown();
  }

  selectOption(option: Option | null): void {
    this.value.set(option);
    this.onChange(option);
    this.selectTriggerRef()?.destroyDropdown();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.selectTriggerRef()?.isDropdownOpen()) {
      this.handleVisibleDropdown(event);
    } else {
      this.handleHiddenDropdown(event);
    }
  }

  private handleHiddenDropdown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
        this.selectTriggerRef()?.openDropdown();
        if (this.selectedOption) {
          this.selectedOption.scrollIntoView();
        }
        event.preventDefault();
        event.stopPropagation();
        break;
      default:
        event.stopPropagation();
        // eslint-disable-next-line no-case-declarations
        const firstFound = this.getOptionStartingWith(event.key);

        if (firstFound) {
          this.writeValue(firstFound.option() || null);
        }
    }
  }

  private handleVisibleDropdown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (this.keyManager.activeItem) {
          this.selectOption(this.keyManager.activeItem.option() || null);
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      case 'Escape':
        this.selectTriggerRef()?.toggleDropdown();
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowRight':
      case 'ArrowLeft':
        this.keyManager.onKeydown(event);
        this.keyManager.activeItem?.scrollIntoView();
        event.preventDefault();
        break;
      case 'Tab':
        this.keyManager.onKeydown(event);
        this.keyManager.activeItem?.scrollIntoView();
        break;
      case 'PageUp':
      case 'PageDown':
        event.preventDefault();
        break;
      default:
        event.stopPropagation();
        // eslint-disable-next-line no-case-declarations
        const firstFound = this.getOptionStartingWith(event.key);
        if (firstFound) {
          firstFound.scrollIntoView();
          this.keyManager.setActiveItem(firstFound);
        }
    }
  }

  private getOptionStartingWith(key: string): CustomSelectOptionComponent {
    if (this.lastKeyPressed === key) {
      this.keyPressIndex++;
    } else {
      this.keyPressIndex = 0;
    }
    this.lastKeyPressed = key;
    const optionsStartingWithKey = this.optionItems().filter((option) => {
      return (
        !option.isDisabled &&
        option
          .getOptionElement()
          ?.textContent?.trim()
          .toLocaleLowerCase()
          .startsWith(key.toLocaleLowerCase())
      );
    });

    return optionsStartingWithKey[
      this.keyPressIndex % optionsStartingWithKey.length
    ];
  }
}
