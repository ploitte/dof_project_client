import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointType'
})
export class PointTypePipe implements PipeTransform {

  transform(pointTypes: any, number: number): any {
    if (number === 25) {
      const newPointTypes: any = pointTypes.filter((pointT: any) => pointT.name != "Triple");
      return newPointTypes;
    } else {
      return pointTypes;
    }
  }

}
