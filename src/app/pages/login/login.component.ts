import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/core/services/battle-net/userinfo/userinfo.service';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
})
export class LoginComponent implements OnInit {
    loading: boolean = true;

    constructor(
        private router: Router,
        private userinfoService: UserInfoService,
    ) { }

    ngOnInit(): void {
        this.userinfoService.getUserInfo().subscribe(userInfo => {
            // If we now get a successful response we can redirect to the home page
            this.router.navigateByUrl('/');
        }, error => {
            // Still throwing error, show login buttons
            this.loading = false;
        });
    }

    login(): void {
        location.href = `${environment.backendUrl}/redirect?returnUrl=` + encodeURIComponent(location.href);
    }
}
