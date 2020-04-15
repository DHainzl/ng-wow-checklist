import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

import { UserInfo } from './core/services/battle-net/userinfo/types/userinfo.interface';
import { UserInfoService } from './core/services/battle-net/userinfo/userinfo.service';
import { ResponsiveService, ScreenSize } from './core/services/responsive/responsive.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {
    isMobile: boolean = true;
    userinfo: UserInfo;

    subscriptions: Subscription = new Subscription();

    isOpened: boolean = true;

    @ViewChild(MatSidenav)
    sidenav: MatSidenav;

    constructor(
        private responsiveService: ResponsiveService,
        private userInfoService: UserInfoService,
    ) { }

    ngOnInit(): void {
        this.subscriptions.add(this.responsiveService.sizeChanged.subscribe(screenSize => {
            this.isMobile = screenSize === 's' || screenSize === 'm';
            this.isOpened = !this.isMobile;
        }));
        this.subscriptions.add(this.userInfoService.getLatestUserInfo().subscribe(userInfo => {
            this.userinfo = userInfo;
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
