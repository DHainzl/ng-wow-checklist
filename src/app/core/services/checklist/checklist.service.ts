import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Checklist } from './checklist.interface';
import { data as bfaAllianceChecklist } from './checklists/08-bfa-alliance';
import { data as bfaHordeChecklist } from './checklists/08-bfa-horde';
import { data as slAllianceChecklist } from './checklists/09-sl-alliance';
import { data as slHordeChecklist } from './checklists/09-sl-horde';
import { data as dragonflightChecklist } from './checklists/10-dragonflight';
import { data as thewarwithinChecklist } from './checklists/11-thewarwithin';

@Injectable({ providedIn: 'root' })
export class ChecklistService {
    private checklists: { [ id: string ]: Checklist } = {
        'bfa-alliance': bfaAllianceChecklist,
        'bfa-horde': bfaHordeChecklist,
        'sl-alliance': slAllianceChecklist,
        'sl-horde': slHordeChecklist,
        'dragonflight': dragonflightChecklist,
        'thewarwithin': thewarwithinChecklist,
    };

    getChecklist(id: string): Observable<Checklist> {
        if (!this.checklists[id]) {
            return throwError(`Checklist ${id} not found!`);
        }
        return of(this.checklists[id]);
    }
}
