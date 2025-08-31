import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Checklist } from './checklist.interface';
@Injectable({ providedIn: 'root' })
export class ChecklistService {
    private checklists: {
        id: string;
        load: () => Promise<Checklist>;
    }[] = [
        { id: 'bfa-alliance', load: () => import('./checklists/08-bfa-alliance').then(m => m.data) },
        { id: 'bfa-horde', load: () => import('./checklists/08-bfa-horde').then(m => m.data) },
        { id: 'sl-alliance', load: () => import('./checklists/09-sl-alliance').then(m => m.data) },
        { id: 'sl-horde', load: () => import('./checklists/09-sl-horde').then(m => m.data) },
        { id: 'dragonflight', load: () => import('./checklists/10-dragonflight').then(m => m.data) },
        { id: 'thewarwithin', load: () => import('./checklists/11-thewarwithin').then(m => m.data) },
    ];

    getChecklist(id: string): Observable<Checklist> {
        const checklist = this.checklists.find(cl => cl.id === id);
        if (!checklist) {
            return throwError(() => new Error(`Checklist ${id} not found!`));
        }
        return fromPromise(checklist.load());
    }
}
