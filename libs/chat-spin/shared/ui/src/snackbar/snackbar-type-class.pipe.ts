import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeClass',
  standalone: true,
})
export class TypeClassPipe implements PipeTransform {
  transform(value: string): string {
    const classMap: Record<string, string> = {
      success: 'alert-success',
      warning: 'alert-warning',
      error: 'alert-error',
      info: 'alert-info',
    };

    return classMap[value] || classMap['info'];
  }
}
