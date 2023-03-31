import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlmanaxService {

  urlBase: string = "https://www.krosmoz.com/fr/almanax/";

  constructor(
    private http: HttpClient,
  ) { }


  /**
   * Get Base
   * @param endUrl 
   * @param params 
   * @returns Promise
   */
  getbase(date: string): Promise<any> {
    return this.http.get(this.urlBase + date, {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/html')
      , responseType: 'text'
    }).toPromise();
  }


}
