import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserInfoService } from '../services/battle-net/userinfo/userinfo.service';

export const isLoggedIn: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const userInfoService = inject(UserInfoService);
    const router = inject(Router);

    return userInfoService.getUserInfo().pipe(
        map(() => true),
        catchError(err => {
            console.error('user might not logged in', err);
            // TODO Extend Backend to return JSON responses in /api
            // and differentiate between not logged in and other errors
            return of(router.createUrlTree([ '/login' ]));
        }),
    );
}