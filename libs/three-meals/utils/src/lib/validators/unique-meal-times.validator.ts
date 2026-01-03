import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function uniqueMealTimesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const controls = control.controls;
    // Get formatted times
    const timeStrings = controls.map((c) => {
      if (!c.value) return null;
      const d = new Date(c.value);
      return isNaN(d.getTime()) ? null : `${d.getHours()}:${d.getMinutes()}`;
    });

    let hasGlobalError = false;

    controls.forEach((childControl, index) => {
      const time = timeStrings[index];
      // Check if this time appears more than once
      // Ignore nulls
      const isDuplicate =
        time !== null && timeStrings.filter((t) => t === time).length > 1;

      const currentErrors = childControl.errors || {};
      const hasDuplicateError = !!currentErrors['duplicateTime'];

      if (isDuplicate) {
        hasGlobalError = true;
        if (!hasDuplicateError) {
          // Add error only if not present to avoid loops
          // emitEvent: false is crucial to prevent infinite validation loops
          childControl.setErrors(
            { ...currentErrors, duplicateTime: true },
            { emitEvent: false }
          );
        }
      } else {
        if (hasDuplicateError) {
          // Remove error
          const { duplicateTime, ...rest } = currentErrors;
          childControl.setErrors(Object.keys(rest).length > 0 ? rest : null, {
            emitEvent: false,
          });
        }
      }
    });

    return hasGlobalError ? { uniqueMealTimes: true } : null;
  };
}
