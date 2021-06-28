import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceReasonPipe'
})
export class SliceReasonPipe implements PipeTransform {

  transform(leave_reason: string, start: number, end: number, ...args: unknown[]): string {
    if(leave_reason.length >= 30) {
      return leave_reason.slice(start, end) + '...';
    }
    return leave_reason;
  }

}
