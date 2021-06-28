import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertMonthToSemester'
})
export class ConvertMonthToSemesterPipe implements PipeTransform {

  transform(month: string, ...args: unknown[]): string {
    let m: number = parseInt(month);
    let result = '';
    if(m >= 8 && m <= 12) {
      result = `Kỳ 1`;
    }
    if(m >= 1 && m <= 7) {
      result = `Kỳ 2`;
    }
    return result;
  }

}
