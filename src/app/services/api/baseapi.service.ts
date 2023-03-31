import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseapiService {

  urlBase: string = "http://localhost:8000/api/";
  userKey: string = "sdfmlksdmfsd454554sdf55sdf";

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * @description Requete GET http de base
   * @param {string} endUrl
   * @param {any} params
   * @return {Observable}
   */
  get(endUrl: string, params?: any,): Observable<any> {
    return this.http.get(this.urlBase + endUrl, { params: params });
  }

  /**
 * @description Requete POST http de base
 * @param {string} endUrl
 * @param {any} params
 * @return {Observable}
 */
  post(endUrl: string, params: any): Observable<any> {
    return this.http.post(this.urlBase + endUrl, params);
  }

  /**
 * @description Requete GET http de base
 * @param {string} endUrl
 * @param {any} params
 * @return {Observable}
 */
  authGet(endUrl: string, params: any): Observable<any> {
    return this.http.get(this.urlBase + endUrl, { params: params, headers: { "Authorization": this.userKey } });
  }

  /**
   * @description Requete POST http de base
   * @param {string} endUrl
   * @param {any} params
   * @return {Observable}
   */
  authPost(endUrl: string, params: any): Observable<any> {
    return this.http.post(this.urlBase + endUrl, params, { headers: { "Authorization": this.userKey } });
  }

  /**
   * @description Supprime une page et ses images
   * @param {number|string} pageId
   */
  authDelete(endUrl: string) {
    let httpParams = new HttpParams()
    return this.http.delete(this.urlBase + endUrl, { headers: { "Authorization": this.userKey } });
  }
}
