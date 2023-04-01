import { NgModule } from '@angular/core';

import { AddTitlePipe } from './add-title.pipe';
import { BarPercentagePipe } from './bar-percentage.pipe';
import { HoALevelPipe } from './hoa-level.pipe';
import { MediaAssetPipe } from './media-asset.pipe';
import { SafeBackgroundImagePipe } from './safe-background-image.pipe';
import { IconPipe } from './icon.pipe';
import { WowheadItemPipe } from './wowhead-item.pipe';

@NgModule({
    exports: [
        HoALevelPipe,
        SafeBackgroundImagePipe,
        BarPercentagePipe,
        MediaAssetPipe,
        AddTitlePipe,
        IconPipe,
        WowheadItemPipe,
    ],
    declarations: [
        HoALevelPipe,
        SafeBackgroundImagePipe,
        BarPercentagePipe,
        MediaAssetPipe,
        AddTitlePipe,
        IconPipe,
        WowheadItemPipe,
    ],
})
export class PipeModule {

}
