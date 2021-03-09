import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { API } from './../config/config';

@Injectable({
  providedIn: 'root'
})

export class HttpFetchService {

  constructor(private http: HttpClient) { }

  /**
   * @description Generic Auth service. 
   * @param url 
   * @param object 
   */
  public postAuth<T>(url: string, object: any) {
    return this.http.post<T>(url, object, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      map(data => data),
      catchError(error => throwError(console.log(error)))
    );
  }

  /**
   * @description Generic post service.
   * @param url 
   * @param object 
   */
  public post<T>(url: string, object: any) {
    return this.http.post<T>(url, object, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    }).pipe(
      map(data => data),
      catchError(error => throwError(console.log(error)))
    );
  }

  /**
   * @description Generic get service.
   * @param url 
   */
  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => throwError(console.log(error)))
    );
  }

  /**
   * @description Generic postData service, would have been used to send files to the backend.
   * @param url 
   * @param object 
   */
  public postData<T>(url: string, object: File) {
    let formData: FormData = new FormData();
    formData.append('file', object, object.name);

    return this.http.post<T>(url, formData, {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token'),
      })
    }).pipe(
      map(res => res),
      catchError(error => throwError(console.log(error)))
    );
  }

  /**
   * @description a more specific data sending service, a normal type could be of type 'blob'
   * @param url 
   * @param type 
   * @param body 
   */
  public postGet(url: string, type: any, body: any) {
    return this.http.post(url, body, {
      responseType: type,
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token'),
      })
    }).pipe(
      map(res => res),
      catchError(error => throwError(console.log(error)))
    );
  }

  /**
   * @description Get data from the backend, would have been used to get images back from the backend later on.
   * @param url 
   * @param type 
   */
  public getData(url: string, type: any) {
    return this.http.get(url, {
      responseType: type,
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token'),
      })
    }).pipe(
      map(res => res),
      catchError(error => throwError(console.log(error)))
    );
  }
}
