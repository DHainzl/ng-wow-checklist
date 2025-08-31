import { ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInfo } from './core/services/battle-net/userinfo/types/userinfo.interface';
import { UserInfoService } from './core/services/battle-net/userinfo/userinfo.service';
import { CharacterInfo } from './core/services/character-store/character-store.interface';
import { CharacterStoreService } from './core/services/character-store/character-store.service';
import { ResponsiveService } from './core/services/responsive/responsive.service';

@Component({
    selector: 'app-root',
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatTooltipModule,

        RouterOutlet,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    private readonly responsiveService = inject(ResponsiveService);
    private readonly userInfoService = inject(UserInfoService);
    private readonly characterStoreService = inject(CharacterStoreService);

    readonly isMobile = signal<boolean>(true);
    readonly userInfo = signal<UserInfo | undefined>(undefined);

    private readonly subscriptions: Subscription = new Subscription();

    readonly isOpened = signal<boolean>(true);
    readonly allCharacters = signal<CharacterInfo[]>([]);

    readonly sidenav = viewChild(MatSidenav);

    ngOnInit(): void {
        this.subscriptions.add(this.responsiveService.sizeChanged.subscribe(screenSize => {
            this.isMobile.set(screenSize === 's' || screenSize === 'm');
            this.isOpened.set(!this.isMobile());
        }));
        this.subscriptions.add(this.userInfoService.getLatestUserInfo().subscribe(userInfo => {
            this.userInfo.set(userInfo);
        }));

        this.subscriptions.add(this.characterStoreService.charactersChanged.subscribe(characters => {
            this.allCharacters.set(characters);
        }));
        this.characterStoreService.getCharacters();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    openSidenav(): void {
        this.sidenav()!.open();
    }

    closeSidenav(): void {
        if (this.isMobile()) {
            this.sidenav()!.close();
        }
    }
}
