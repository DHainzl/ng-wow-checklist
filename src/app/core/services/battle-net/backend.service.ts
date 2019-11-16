import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackendService {
    constructor(
        private http: HttpClient,
    ) { }

    getData<T>(url: string): Observable<T> {
        return this.http.get<T>(url, {
            headers: new HttpHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            }),
            withCredentials: true,
        });
    }
}
