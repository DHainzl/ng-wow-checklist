import { NgModule } from '@angular/core';

import { HoALevelPipe } from './hoa-level.pipe';
import { SafeBackgroundImagePipe } from './safe-background-image.pipe';

@NgModule({
    exports: [
        HoALevelPipe,
        SafeBackgroundImagePipe,
    ],
    declarations: [
        HoALevelPipe,
        SafeBackgroundImagePipe,
    ],
})
export class PipeModule {

}
