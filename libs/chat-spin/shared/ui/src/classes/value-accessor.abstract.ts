/* eslint-disable @typescript-eslint/no-empty-function */

import { Directive, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class AbstractValueAccessor<T = unknown>
  implements ControlValueAccessor
{
  public value = signal<T | null>(null);

  onChange = (_: T | null): void => {};

  onTouched = (_: T | null): void => {};

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
