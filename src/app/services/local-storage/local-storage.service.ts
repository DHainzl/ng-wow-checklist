import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    set<T>(key: string, value: T): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    get<T>(key: string): T {
        return JSON.parse(window.localStorage.getItem(key));
    }
}