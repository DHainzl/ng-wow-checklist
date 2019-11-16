import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';

import { UserInfoService } from '../services/battle-net/userinfo/userinfo.service';

@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivate {
    constructor(
        private userinfoService: UserInfoService,
        private router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.userinfoService.getUserInfo().pipe(
            mapTo(true),
            catchError(err => {
                console.error('user might not logged in', err);
                // TODO Extend Backend to return JSON responses in /api
                // and differentiate between not logged in and other errors
                return of(this.router.createUrlTree([ '/login' ]));
            }),
        );
    }

}
