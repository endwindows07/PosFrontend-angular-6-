﻿import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
// เอาใว้ดัก error จาก backend
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class HttpService {
    constructor(private http: HttpClient) 
    {
        this.http.get("https://localhost:44328/api/values").subscribe(res => console.log(res));
    }

    private address: string = "https://localhost:44328/";

    requestPost(url: string, body: any, accessToken?: string) {
        return this.http.post(`${this.address}${url}`, body, { headers: this.appendHeaders(accessToken) })
            .pipe(catchError(err => this.errorHandler(err)));
    }

    // html get
    requestGet(url: string, accessToken?: string) {
        return this.http.get(`${this.address}${url}`, { headers: this.appendHeaders(accessToken) })
                        .pipe(catchError(err => this.errorHandler(err)));
    }

    //Error: ดัก error เพือ่ปรับแต่ง
    private errorHandler(errorResponse: HttpErrorResponse): Observable<any> {
        console.log(errorResponse.error.text, 'err');

        errorResponse["Message"] = errorResponse.message;

        if (errorResponse.error && errorResponse.message) {
            errorResponse["Message"] = errorResponse.error.message;
        }
        
        throw errorResponse;
    }

    // HeaderHtml: การสร้าง header html
    private appendHeaders(accessToken) {
        const headers = {};
        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return new HttpHeaders(headers);
    }
}
