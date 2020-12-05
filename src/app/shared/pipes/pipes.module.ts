import { NgModule } from '@angular/core';

import { AddTitlePipe } from './add-title.pipe';
import { BarPercentagePipe } from './bar-percentage.pipe';
import { HoALevelPipe } from './hoa-level.pipe';
import { MediaAssetPipe } from './media-asset.pipe';
import { SafeBackgroundImagePipe } from './safe-background-image.pipe';

@NgModule({
    exports: [
        HoALevelPipe,
        SafeBackgroundImagePipe,
        BarPercentagePipe,
        MediaAssetPipe,
        AddTitlePipe,
    ],
    declarations: [
        HoALevelPipe,
        SafeBackgroundImagePipe,
        BarPercentagePipe,
        MediaAssetPipe,
        AddTitlePipe,
    ],
})
export class PipeModule {

}
