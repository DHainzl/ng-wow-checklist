import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CharacterStoreService } from '../../character-store/character-store.service';
import { ChecklistItemManual } from '../../checklist/checklist.interface';
import { EvaluatedChecklistItem } from '../evaluated-checklist-item.interface';
import { CHECKLIST_CHARACTERINFO, ChecklistHandler } from './_handler.service';

@Injectable()
export class ChecklistManualHandler extends ChecklistHandler<ChecklistItemManual> {
    private readonly characterStoreService = inject(CharacterStoreService);

    private readonly characterInfo = inject(CHECKLIST_CHARACTERINFO);

    evaluate(): EvaluatedChecklistItem {
        const baseItem = this.getBaseEvaluatedItem();

        if (!this.characterInfo.overrides) {
            return {
                ...baseItem,
                completed: 'loading',
                note: undefined,
            };
        }

        if (this.isCompleted()) {
            return {
                ...baseItem,
                completed: 'complete',
                note: {
                    type: 'button',
                    label: 'Uncheck',
                    onClick: () => this.changeChecked(false),
                }
            };
        } else {
            return {
                ...baseItem,
                completed: 'incomplete',
                note: {
                    type: 'button',
                    label: 'Check',
                    onClick: () => this.changeChecked(true),
                }
            };
        }
    }

    isCompleted(): boolean {
        const override = this.characterInfo.overrides[this.item.key];

        if (override && override.type === 'manual') {
            return override.checked;
        }

        return false;
    }

    // TODO Only works on reload ...
    private changeChecked(isChecked: boolean): Observable<undefined> {
        const { region, realm, name } = this.characterInfo;

        return this.characterStoreService
            .getCharacter(region, realm, name)
            .pipe(
                mergeMap(character => {
                    if (!character) {
                        console.warn('character not found');
                        return of(undefined);
                    }

                    character.overrides[this.item.key] = {
                        type: 'manual',
                        checked: isChecked,
                    };

                    return this.characterStoreService.setCharacter(character);
                }),
            );
    }
}
