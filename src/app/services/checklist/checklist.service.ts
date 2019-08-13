import { Injectable } from "@angular/core";
import { Checklist } from './checklist.interface';

import { data as bfaAllianceChecklist } from './checklists/bfa-alliance';
import { data as bfaHordeChecklist } from './checklists/bfa-horde';
import { Observable, throwError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChecklistService {
    private checklists: { [ id: string ]: Checklist } = {
        'bfa-alliance': bfaAllianceChecklist,
        'bfa-horde': bfaHordeChecklist,
    };

    getChecklist(id: string): Observable<Checklist> {
        if (!this.checklists[id]) {
            return throwError(`Checklist ${id} not found!`);
        }
        return of(this.checklists[id]);
    }
}