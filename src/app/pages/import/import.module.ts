import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImportComponent } from './import.component';

@NgModule({
    imports: [
        RouterModule.forChild([ { path: '', component: ImportComponent } ]),

        CommonModule,
        SharedModule,
    ],
    declarations: [
        ImportComponent,
    ],
})
export class ImportModule {}
