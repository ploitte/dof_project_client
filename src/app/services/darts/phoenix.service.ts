import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoenixService {

  urlBase: string = "https://www.phoenixdarts.com/fr/shop/ranking?s_seq=53371";

  constructor(
    private http: HttpClient,
  ) { }


  /**
   * Get Base
   * @param endUrl 
   * @param params 
   * @returns Promise
   */
  getbase(date?: string): Promise<any> {
    return this.http.get(this.urlBase, {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/html')
      , responseType: 'text'
    }).toPromise();
  }

}
