import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialCommonModule } from './material-common.module';
import { PipeModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        PipeModule,
        MaterialCommonModule,

        ReactiveFormsModule,
        FormsModule,

    ],
    exports: [
        PipeModule,
        MaterialCommonModule,

        ReactiveFormsModule,
        FormsModule,
    ],
})
export class SharedModule {

}
