import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ScreenSize = 'unknown' | 'xs' | 's' | 'm' | 'l' | 'xl';

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
    private readonly breakpointObserver = inject(BreakpointObserver);
    private readonly breakpointList: {
        breakpoint: string;
        size: ScreenSize;
    }[] = [
        { breakpoint: Breakpoints.XSmall, size: 'xs' },
        { breakpoint: Breakpoints.Small, size: 's' },
        { breakpoint: Breakpoints.Medium, size: 'm' },
        { breakpoint: Breakpoints.Large, size: 'l' },
        { breakpoint: Breakpoints.XLarge, size: 'xl' },
    ]

    private readonly sizeChanged$: BehaviorSubject<ScreenSize> = new BehaviorSubject<ScreenSize>('unknown');
    get sizeChanged() { return this.sizeChanged$.asObservable() }

    constructor() {
        this.breakpointObserver.observe(
            this.breakpointList.map(list => list.breakpoint),
        ).subscribe(state => {
            this.sizeChanged$.next(this.getScreenSize(state));
        });
    }

    private getScreenSize(breakpointState: BreakpointState): ScreenSize {
        const matchedBreakpoint = Object.entries(breakpointState.breakpoints)
            .find(([ key, value ]) => value);

        if (!matchedBreakpoint) {
            console.warn('No breakpoint matched', breakpointState);
            return 'unknown';
        }

        const foundMapping = this.breakpointList.find(list => list.breakpoint === matchedBreakpoint[0]);
        return foundMapping?.size ?? 'unknown';
    }
}
