import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BackendService } from '../backend.service';
import { Region } from '../battle-net.interface';
import { BattleNetCharacterList } from './types/characters.interface';

@Injectable({ providedIn: 'root' })
export class CharactersService {
    private readonly backendService = inject(BackendService);

    public getCharacters(region: Region): Observable<BattleNetCharacterList> {
        const url = `${environment.backendUrl}/api/characters/${region}`;
        return this.backendService.getData<BattleNetCharacterList>(url);
    }
}
