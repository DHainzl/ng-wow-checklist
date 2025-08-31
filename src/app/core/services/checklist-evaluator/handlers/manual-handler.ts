import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CharacterInfo } from '../../character-store/character-store.interface';
import { CharacterStoreService } from '../../character-store/character-store.service';
import { ChecklistItemManual } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { ChecklistEvaluatorData } from './_handler.interface';
import { ChecklistHandler } from './_handler.service';

@Injectable({ providedIn: 'root' })
export class ChecklistManualHandler extends ChecklistHandler<ChecklistItemManual> {
    private readonly characterStoreService = inject(CharacterStoreService);

    evaluate(item: ChecklistItemManual, evaluated: EvaluatedChecklistItem[], data: ChecklistEvaluatorData): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem(item, data);

        if (!data.characterInfo.overrides) {
            return {
                ...baseItem,
                completed: 'loading',
                note: undefined,
            };
        }

        if (this.isCompleted(item, data.characterInfo.overrides)) {
            return {
                ...baseItem,
                completed: 'complete',
                note: {
                    type: 'button',
                    label: 'Uncheck',
                    onClick: () => this.changeChecked(false, item, data.characterInfo),
                }
            };
        } else {
            return {
                ...baseItem,
                completed: 'incomplete',
                note: {
                    type: 'button',
                    label: 'Check',
                    onClick: () => this.changeChecked(true, item, data.characterInfo),
                }
            };
        }
    }

    isCompleted(item: ChecklistItemManual, overrides: CharacterInfo['overrides']): boolean {
        const override = overrides[item.key];

        if (override && override.type === 'manual') {
            return override.checked;
        }

        return false;
    }

    // TODO Only works on reload ...
    private changeChecked(isChecked: boolean, item: ChecklistItemManual, characterInfo: CharacterInfo): Observable<undefined> {
        return this.characterStoreService
            .getCharacter(characterInfo.region, characterInfo.realm, characterInfo.name)
            .pipe(
                mergeMap(character => {
                    if (!character) {
                        console.warn('character not found');
                        return of(undefined);
                    }

                    character.overrides[item.key] = {
                        type: 'manual',
                        checked: isChecked,
                    };

                    return this.characterStoreService.setCharacter(character);
                }),
            );
    }
}
