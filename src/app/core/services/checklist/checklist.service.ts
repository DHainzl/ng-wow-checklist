import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { BattleNetProfile } from '../battle-net/character/types/battlenet-profile';
import { Checklist } from './checklist.interface';
@Injectable({ providedIn: 'root' })
export class ChecklistService {
    private checklists: {
        id: string;
        name: string;
        isVisible?: (profile: BattleNetProfile) => boolean;
        load: () => Promise<Checklist>;
    }[] = [
        {
            id: 'bfa-alliance',
            name: 'Battle for Azeroth',
            isVisible: profile => profile.faction.type === 'ALLIANCE',
            load: () => import('./checklists/08-bfa-alliance').then(m => m.data),
        },
        {
            id: 'bfa-horde',
            name: 'Battle for Azeroth',
            isVisible: profile => profile.faction.type === 'HORDE',
            load: () => import('./checklists/08-bfa-horde').then(m => m.data),
        },
        {
            id: 'sl-alliance',
            name: 'Shadowlands',
            isVisible: profile => profile.faction.type === 'ALLIANCE',
            load: () => import('./checklists/09-sl-alliance').then(m => m.data),
        },
        {
            id: 'sl-horde',
            name: 'Shadowlands',
            isVisible: profile => profile.faction.type === 'HORDE',
            load: () => import('./checklists/09-sl-horde').then(m => m.data),
        },
        {
            id: 'dragonflight',
            name: 'Dragonflight',
            load: () => import('./checklists/10-dragonflight').then(m => m.data),
        },
        {
            id: 'thewarwithin',
            name: 'The War Within',
            load: () => import('./checklists/11-thewarwithin').then(m => m.data),
        },
    ];

    getLatestChecklistId(): string {
        return this.checklists[this.checklists.length - 1].id;
    }

    getAvailableChecklists(profile: BattleNetProfile): { id: string, name: string }[] {
        return this.checklists
            .filter(checklist => checklist.isVisible?.(profile) ?? true)
            .map(checklist => ({
                id: checklist.id,
                name: checklist.name,
            }));
    }

    getChecklist(id: string): Observable<Checklist> {
        const checklist = this.checklists.find(cl => cl.id === id);
        if (!checklist) {
            return throwError(() => new Error(`Checklist ${id} not found!`));
        }
        return fromPromise(checklist.load());
    }
}
