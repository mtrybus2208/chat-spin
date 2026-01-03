import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function timeIntervalValidator(intervalMinutes: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const date = new Date(control.value);

    // Check if valid date
    if (isNaN(date.getTime())) {
      return null;
    }

    const minutes = date.getMinutes();

    if (minutes % intervalMinutes !== 0) {
      return {
        timeInterval: {
          requiredInterval: intervalMinutes,
          actualMinutes: minutes,
        },
      };
    }

    return null;
  };
}
