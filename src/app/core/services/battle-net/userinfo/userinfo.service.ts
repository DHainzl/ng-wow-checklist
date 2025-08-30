import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { BackendService } from '../backend.service';
import { UserInfo } from './types/userinfo.interface';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
    private readonly backendService = inject(BackendService);

    private readonly userInfo$: Subject<UserInfo> = new Subject();

    public getUserInfo(): Observable<UserInfo> {
        const url = `${environment.backendUrl}/api/userinfo`;
        return this.backendService.getData<UserInfo>(url).pipe(
            tap(userInfo => this.userInfo$.next(userInfo)),
        );
    }

    public getLatestUserInfo(): Observable<UserInfo> {
        return this.userInfo$.asObservable();
    }
}
