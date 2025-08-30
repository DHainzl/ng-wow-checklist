import { Pipe, PipeTransform } from '@angular/core';
import { BattleNetMedia } from '../../core/services/battle-net/character/types/battlenet-media';

@Pipe({
    name: 'mediaAsset',
})
export class MediaAssetPipe implements PipeTransform {
    transform(mediaData: BattleNetMedia, assetKey: string): string {
        if (!mediaData || !mediaData.assets) {
            return '';
        }

        const asset = mediaData.assets.find(a => a.key === assetKey);
        if (!asset) {
            return '';
        }

        return asset.value;
    }

}
