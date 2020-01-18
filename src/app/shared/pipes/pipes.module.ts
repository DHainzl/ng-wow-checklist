import { NgModule } from '@angular/core';

import { BarPercentagePipe } from './bar-percentage.pipe';
import { HoALevelPipe } from './hoa-level.pipe';
import { SafeBackgroundImagePipe } from './safe-background-image.pipe';

@NgModule({
    exports: [
        HoALevelPipe,
        SafeBackgroundImagePipe,
        BarPercentagePipe,
    ],
    declarations: [
        HoALevelPipe,
        SafeBackgroundImagePipe,
        BarPercentagePipe,
    ],
})
export class PipeModule {

}
