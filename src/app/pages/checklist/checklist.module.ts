import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChecklistLineComponent } from './checklist-line/checklist-line.component';
import { ChecklistComponent } from './checklist.component';

@NgModule({
    imports: [
        RouterModule.forChild([ { path: '', component: ChecklistComponent } ]),

        CommonModule,
        SharedModule,
    ],
    declarations: [
        ChecklistComponent,
        ChecklistLineComponent,
    ],
})
export class ChecklistModule { }
