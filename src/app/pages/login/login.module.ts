import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        RouterModule.forChild([ { path: '', component: LoginComponent } ]),

        CommonModule,
        SharedModule,
    ],
    declarations: [
        LoginComponent,
    ],
})
export class LoginModule {

}
