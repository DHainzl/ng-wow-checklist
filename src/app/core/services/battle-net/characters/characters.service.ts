import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { BackendService } from '../backend.service';
import { Region } from '../battle-net.interface';

import { BattleNetCharacterList } from './types/characters.interface';

@Injectable({ providedIn: 'root' })
export class CharactersService {
    constructor(
        private backendService: BackendService,
    ) { }

    public getCharacters(region: Region): Observable<BattleNetCharacterList> {
        const url = `${environment.backendUrl}/api/characters/${region}`;
        return this.backendService.getData<BattleNetCharacterList>(url);
    }
}
