import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { GearGridComponent } from './gear-grid.component';
import { GearIlvlComponent } from './components/gear-ilvl/gear-ilvl.component';

@NgModule({
    imports: [
        RouterModule.forChild([ { path: '', component: GearGridComponent } ]),

        CommonModule,
        SharedModule,
    ],
    declarations: [
        GearGridComponent,
        GearIlvlComponent,
    ],
})
export class GearGridModule { }
