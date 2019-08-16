import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export type ScreenSize = 's' | 'm' | 'l' | 'xl';

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
    sizeChanged: BehaviorSubject<ScreenSize> = new BehaviorSubject(this.getScreenSize());

    private onResize: Subject<never> = new Subject();

    constructor(
         private eventManager: EventManager,
    ) {
        this.onResize.pipe(
            debounceTime(50),
            map(() => this.getScreenSize()),
        ).subscribe(screenSize => this.sizeChanged.next(screenSize));
        this.eventManager.addGlobalEventListener('window', 'resize', () => this.onResize.next());
    }

    private getScreenSize(): ScreenSize {
        if (!window) {
            return;
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
