import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { LocalForageService } from '../local-forage/local-forage.service';

import { BackendService } from './backend.service';

@Injectable({ providedIn: 'root' })
export class CachedRequestService {
    constructor(
        private backendService: BackendService,
        private localForageService: LocalForageService,
    ) {

    }

    requestWithCache<T>(
        url: string,
        cacheKey: string,
        cached: boolean = false,
    ): Observable<T> {
        let cache$: Observable<T | undefined> = of(undefined);
        if (cached) {
            cache$ = this.localForageService.get(cacheKey);
        }

        return cache$.pipe(
            flatMap(cachedData => {
                if (cachedData) {
                    return of(cachedData);
                }

                return this.backendService.getData<T>(url).pipe(
                    tap(character => {
                        this.localForageService.set(cacheKey, character);
                    }),
                );
            }),
        );
    }
}
