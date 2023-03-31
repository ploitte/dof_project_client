import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BaseapiService } from './baseapi.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(
    private base: BaseapiService
  ) { }


  /**
 * @description Récupère les pages du commerçant
 * @param {number} userId
 */
  getEquipmentByName(equipmentName: string): Promise<any> {
    return this.base.get("getEquipmentByName/" + equipmentName).pipe(
      map(data => {
        data.map((eq: any) => {
          eq.statistics = JSON.parse(eq.statistics)
          eq.recipe = JSON.parse(eq.recipe)
        })
        return data;
      })
    ).toPromise();
  }


}
