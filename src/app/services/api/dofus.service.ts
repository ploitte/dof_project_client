import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BaseapiService } from './baseapi.service';

@Injectable({
  providedIn: 'root'
})
export class DofusService {

  constructor(
    private base: BaseapiService
  ) { }

  /**
 * @description Récupère les dofus 
 */
    getDofus(): Promise<any> {
      return this.base.get("getDofus").pipe(
        map(data => {
          return data;
        })
      ).toPromise();
    }

    getDofusDrops(): Promise<any> {
      return this.base.get("getDofusDrops").pipe(
        map(data => {
          return data;
        })
      ).toPromise();
    }

 /**
   * Create dofus drop
   * @param dofusDrop any
   */
 createDofusDrop(dofusDrop: any): Promise<any> {
  return this.base.post("createDofusDrop", {
    dofusDrop: dofusDrop
  }).toPromise();
}


/**
 * Update Dofus drop
 * @param dofusDrop 
 * @returns Promise
 */
updateDofusDrop(dofusDrop: any): Promise<any> {
  return this.base.post("updateDofusDrop", {
    dofusDrops: dofusDrop
  }).toPromise();
}


/**
 * Delete dofus drop
 * @returns Promise
 */
deleteDofusDrop(dofusDropId: any): Promise<any> {
  return this.base.get("deleteDofusDrop/" + dofusDropId).toPromise();
}
    
}
