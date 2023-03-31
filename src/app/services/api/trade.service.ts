import { Injectable } from '@angular/core';
import { BaseapiService } from './baseapi.service';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(
    private base: BaseapiService
  ) { }

  /**
   * Create trade
   * @param trade any
   * @param equipment any 
   */
  createTrade(trade: any, equipment: any): Promise<any> {
    return this.base.post("createTrade", {
      trade: trade,
      equipment: equipment
    }).toPromise();
  }

  /**
   * Get trades
   * @returns Promise
   */
  getTrades(): Promise<any> {
    return this.base.get("getTrades").toPromise();
  }

  /**
   * Update trade
   * @param trade 
   * @returns Promise
   */
  updateTrade(trade: any): Promise<any> {
    return this.base.post("updateTrade", {
      trade: trade
    }).toPromise();
  }


  /**
   * Get trades
   * @returns Promise
   */
  deleteTrade(tradeId: any): Promise<any> {
    return this.base.get("deleteTrade/" + tradeId).toPromise();
  }


}
