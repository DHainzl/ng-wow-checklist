import { Pipe, PipeTransform } from '@angular/core';
import { BattleNetProfileTitle } from 'src/app/core/services/battle-net/character/types/battlenet-profile';

@Pipe({
    name: 'addTitle',
})
export class AddTitlePipe implements PipeTransform {
    transform(name: string, activeTitle: BattleNetProfileTitle): string {
        if (!activeTitle || !activeTitle.display_string) {
            return name;
        }

        return activeTitle.display_string.replace('{name}', name);
    }

}
