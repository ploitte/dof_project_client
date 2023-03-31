import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rounded'
})
export class RoundedPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.round(value * 10) / 10
  }

}
