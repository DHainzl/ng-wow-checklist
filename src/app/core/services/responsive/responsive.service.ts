import { MediaMatcher } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export type ScreenSize = 'unknown' | 's' | 'm' | 'l' | 'xl';

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
    private readonly mediaMatcher = inject(MediaMatcher);

    sizeChanged: BehaviorSubject<ScreenSize> = new BehaviorSubject(this.getScreenSize());

    constructor() {
        fromEvent(window, 'resize').pipe(
            debounceTime(50),
            map(() => this.getScreenSize()),
        ).subscribe(screenSize => this.sizeChanged.next(screenSize));
    }

    private getScreenSize(): ScreenSize {
        if (!window) {
            return 'unknown';
        }

        const width = window.innerWidth;
        if (width < 768) {
            return 's';
        } else if (width < 992) {
            return 'm';
        } else if (width < 1200) {
            return 'l';
        } else {
            return 'xl';
        }
    }
}
