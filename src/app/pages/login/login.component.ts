import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserInfoService } from '../../core/services/battle-net/userinfo/userinfo.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: [ '../page-style.scss', './login.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
    ]
})
export class LoginComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly userInfoService = inject(UserInfoService);

    readonly loading = signal<boolean>(true);

    ngOnInit(): void {
        this.userInfoService.getUserInfo().subscribe({
            next: _userInfo => {
                // If we now get a successful response we can redirect to the home page
                this.router.navigateByUrl('/');
            },
            error: error => {
                // Still throwing error, show login buttons
                this.loading.set(false);
            },
        });
    }

    login(): void {
        location.href = `${environment.backendUrl}/redirect?returnUrl=` + encodeURIComponent(location.href);
    }
}
