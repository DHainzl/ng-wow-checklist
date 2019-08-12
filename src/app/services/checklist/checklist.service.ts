import { Injectable } from "@angular/core";
import { Checklist } from './checklist.interface';

import { data as bfaAllianceChecklist } from './checklists/bfa-alliance';
import { Observable, throwError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChecklistService {
    private checklists: { [ id: string ]: Checklist } = {
        'bfa-alliance': bfaAllianceChecklist,
    };

    getChecklist(id: string): Observable<Checklist> {
        if (!this.checklists[id]) {
            return throwError(`Checklist ${id} not found!`);
        }
        return of(this.checklists[id]);
    }
}