import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

interface ErrorResponse {
    code: number;
    type: string;
    detail: string;
}

@Injectable({ providedIn: 'root' })
export class BackendService {
    private http = inject(HttpClient);

    getData<T extends object>(url: string): Observable<T> {
        return this.http.get<T | ErrorResponse>(url, {
            headers: new HttpHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            }),
            withCredentials: true,
        }).pipe(
            mergeMap(data => {
                if (this.isErrorResponse(data)) {
                    return throwError(() => new Error(`Backend returned error: ${data.type} (${data.code} ${data.detail})`));
                }
                return of(data);
            }),
        );
    }

    private isErrorResponse<T extends object>(data: T | ErrorResponse): data is ErrorResponse {
        return 'type' in data && 'code' in data && 'detail' in data;
    }
}
