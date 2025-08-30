import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    set<T>(key: string, value: T): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    get<T>(key: string): T | null {
        const item = window.localStorage.getItem(key);
        if (!item) {
            return null;
        }

        return JSON.parse(item);
    }
}
