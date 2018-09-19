import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
// เอาใว้ดัก error จาก backend
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}
  private address = 'http://localhost:8080/';

  requestPost(url: string, body: any, accessToken?: string) {
    return this.http
      .post(`${this.address}${url}`, body, {
        headers: this.appendHeaders(accessToken)
      })
      .pipe(catchError(err => this.errorHandler(err)));
  }

  // html get
  requestGet(url: string, accessToken?: string) {
    return this.http
      .get(`${this.address}${url}`, {
        headers: this.appendHeaders(accessToken)
      })
      .pipe(catchError(err => this.errorHandler(err)));
  }

  // html delete
  requestDelete(url: string, accessToken?: string) {
    return this.http
      .delete(`${this.address}${url}`, {
        headers: this.appendHeaders(accessToken)
      })
      .pipe(catchError(err => this.errorHandler(err)));
  }

  // html put
  requestPut(url: string, body: any, accessToken?: string) {
    return this.http
      .put(`${this.address}${url}`, body, {
        headers: this.appendHeaders(accessToken)
      })
      .pipe(catchError(err => this.errorHandler(err)));
  }

  // Error: ดัก error เพือ่ปรับแต่ง
  private errorHandler(errorResponse: HttpErrorResponse): Observable<any> {
    console.log(errorResponse);

    errorResponse['Message'] = errorResponse.message;
    if (errorResponse.error && errorResponse.message) {
      errorResponse['Message'] = errorResponse.error;
    }
    throw errorResponse;
  }

  // HeaderHtml: การสร้าง header html
  private appendHeaders(accessToken) {
    const headers = {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return new HttpHeaders(headers);
  }
}
