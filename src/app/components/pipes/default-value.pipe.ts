import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue',
  standalone: true
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: string | null | undefined, defaultText: string = 'Значение не определено'): string {
    return value?.trim() ? value : defaultText;
  }
}
