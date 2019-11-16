import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { flatMap } from 'rxjs/operators';

interface ErrorResponse {
    code: number;
    type: string;
    detail: string;
}

@Injectable({ providedIn: 'root' })
export class BackendService {
    constructor(
        private http: HttpClient,
    ) { }

    getData<T>(url: string): Observable<T> {
        return this.http.get<T | ErrorResponse>(url, {
            headers: new HttpHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            }),
            withCredentials: true,
        }).pipe(
            flatMap(data => {
                if (this.isErrorResponse(data)) {
                    return throwError(`Backend returned error: ${data.type} (${data.code} ${data.detail})`);
                }
                return of(data);
            }),
        );
    }

    private isErrorResponse<T>(data: T | ErrorResponse): data is ErrorResponse {
        return data.hasOwnProperty('type') && data.hasOwnProperty('code') && data.hasOwnProperty('detail');
    }
}
