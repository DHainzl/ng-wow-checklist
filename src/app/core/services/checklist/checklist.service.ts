import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Checklist } from './checklist.interface';
import { data as bfaAllianceChecklist } from './checklists/bfa-alliance';
import { data as bfaHordeChecklist } from './checklists/bfa-horde';
import { data as slAllianceChecklist } from './checklists/sl-alliance';
import { data as slHordeChecklist } from './checklists/sl-horde';

@Injectable({ providedIn: 'root' })
export class ChecklistService {
    private checklists: { [ id: string ]: Checklist } = {
        'bfa-alliance': bfaAllianceChecklist,
        'bfa-horde': bfaHordeChecklist,
        'sl-alliance': slAllianceChecklist,
        'sl-horde': slHordeChecklist,
    };

    getChecklist(id: string): Observable<Checklist> {
        if (!this.checklists[id]) {
            return throwError(`Checklist ${id} not found!`);
        }
        return of(this.checklists[id]);
    }
}
