import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { LocalForageService } from '../local-forage/local-forage.service';
import { BackendService } from './backend.service';

@Injectable({ providedIn: 'root' })
export class CachedRequestService {
    private readonly backendService = inject(BackendService);
    private readonly localForageService = inject(LocalForageService);

    requestWithCache<T extends object>(
        url: string,
        cacheKey: string,
        cached: boolean = false,
    ): Observable<T> {
        let cache$: Observable<T | undefined | null> = of(undefined);
        if (cached) {
            cache$ = this.localForageService.get(cacheKey);
        }

        return cache$.pipe(
            mergeMap(cachedData => {
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
