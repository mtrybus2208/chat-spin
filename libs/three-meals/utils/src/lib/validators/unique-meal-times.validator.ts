import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueMealTimesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const values = control.getRawValue();
    const times = values
      .map((v: any) => {
        if (!v) return null;
        const date = new Date(v);
        return isNaN(date.getTime()) ? null : `${date.getHours()}:${date.getMinutes()}`;
      })
      .filter((v: string | null) => v !== null);

    const uniqueTimes = new Set(times);

    if (uniqueTimes.size !== times.length) {
      return { uniqueMealTimes: true };
    }

    return null;
  };
}

