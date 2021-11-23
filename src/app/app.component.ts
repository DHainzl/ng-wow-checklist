import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

import { UserInfo } from './core/services/battle-net/userinfo/types/userinfo.interface';
import { UserInfoService } from './core/services/battle-net/userinfo/userinfo.service';
import { CharacterInfo } from './core/services/character-store/character-store.interface';
import { CharacterStoreService } from './core/services/character-store/character-store.service';
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
    allCharacters: CharacterInfo[] = [];

    @ViewChild(MatSidenav)
    sidenav: MatSidenav;

    constructor(
        private responsiveService: ResponsiveService,
        private userInfoService: UserInfoService,
        private characterStoreService: CharacterStoreService,
    ) { }

    ngOnInit(): void {
        this.subscriptions.add(this.responsiveService.sizeChanged.subscribe(screenSize => {
            this.isMobile = screenSize === 's' || screenSize === 'm';
            this.isOpened = !this.isMobile;
        }));
        this.subscriptions.add(this.userInfoService.getLatestUserInfo().subscribe(userInfo => {
            this.userinfo = userInfo;
        }));

        this.subscriptions.add(this.characterStoreService.charactersChanged.subscribe(characters => {
            this.allCharacters = characters;
        }));
        this.characterStoreService.getCharacters();
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
