import { Observable, of, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { CharacterInfo } from '../../character-store/character-store.interface';
import { ChecklistItemManual } from '../../checklist/checklist.interface';
import { CharacterId } from '../checklist-request-container.service';
import { ChecklistHandler } from './_handler';

export class ChecklistManualHandler extends ChecklistHandler<ChecklistItemManual> {
    subscriptions: Subscription = new Subscription();
    characterId: CharacterId | undefined;

    handlerInit(): void {
        this._note$.next({
            type: 'button',
            label: 'Uncheck',
            onClick: () => this.changeChecked(false),
        });

        this.subscriptions.add(this.checklistRequestContainer.overridesChanged.subscribe(overrides => {
            this.evaluate(overrides);
        }));
        this.subscriptions.add(this.checklistRequestContainer.characterChanged.subscribe(characterId => {
            this.characterId = characterId;
        }));
    }

    handlerDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private evaluate(overrides: CharacterInfo['overrides']): void {
        if (!overrides) {
            this._completed$.next('loading');
            this._note$.next(undefined);
            return;
        }

        if (this.isCompleted(overrides)) {
            this._completed$.next('complete');
            this._note$.next({
                type: 'button',
                label: 'Uncheck',
                onClick: () => this.changeChecked(false),
            });
        } else {
            this._completed$.next('incomplete');
            this._note$.next({
                type: 'button',
                label: 'Check',
                onClick: () => this.changeChecked(true),
            });
        }
    }

    isCompleted(overrides: CharacterInfo['overrides']): boolean {
        const override = overrides[this.item.key];

        if (override && override.type === 'manual') {
            return override.checked;
        }

        return false;
    }

    private changeChecked(isChecked: boolean): Observable<undefined> {
        return this.characterStoreService
            .getCharacter(this.characterId!.region, this.characterId!.realm, this.characterId!.name)
            .pipe(
                flatMap(character => {
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
