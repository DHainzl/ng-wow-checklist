import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { forkJoin, from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LocalForageService {
    set<T>(key: string, value: T): Observable<T> {
        return from(localforage.setItem(key, value));
    }
    get<T>(key: string): Observable<T | null> {
        return from(localforage.getItem<T>(key));
    }

    clearKeysStartingWith(prefix: string): Observable<void[]> {
        return from(localforage.keys()).pipe(
            mergeMap(keys => {
                const remove$ = keys.filter(key => key.indexOf(prefix) === 0)
                    .map(key => localforage.removeItem(key));
                return forkJoin(remove$);
            }),
        );
    }
}
