import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subscription } from 'rxjs';

import { ResponsiveService, ScreenSize } from './core/services/responsive/responsive.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {
    isMobile: boolean = true;

    subscriptions: Subscription = new Subscription();

    isOpened: boolean = true;

    @ViewChild(MatSidenav, { static: false })
    sidenav: MatSidenav;

    constructor(
        private responsiveService: ResponsiveService,
    ) { }

    ngOnInit(): void {
        this.subscriptions.add(this.responsiveService.sizeChanged.subscribe(screenSize => {
            this.isMobile = screenSize === 's' || screenSize === 'm';
            this.isOpened = !this.isMobile;
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    openSidenav(): void {
        this.sidenav.open();
    }

    closeSidenav(): void {
        if (this.isMobile) {
            this.sidenav.close();
        }
    }
}
