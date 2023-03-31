import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricePack'
})
export class PricePackPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.toLocaleString();
  }
}
