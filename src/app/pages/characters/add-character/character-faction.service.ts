import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export type Faction = 'ALLIANCE' | 'HORDE' | 'NEUTRAL';

@Injectable({ providedIn: 'root' })
export class CharacterFactionService {
    private static readonly RACES_ALLIANCE = [
        1,      // Human
        3,      // Dwarf
        4,      // Night Elf
        7,      // Gnome
        11,     // Draenei
        22,     // Worgen
        25,     // Pandaren
        29,     // Void Elf
        30,     // Lightforged Draenei
        32,     // Kul Tiran
        34,     // Dark Iron Dwarf
    ];
    private static readonly RACES_HORDE = [
        2,      // Orc
        5,      // Undead
        6,      // Tauren
        8,      // Troll
        9,      // Goblin
        10,     // Blood Elf
        26,     // Pandaren
        27,     // Nigtborne
        28,     // Highmountain Tauren
        31,     // Zandalari Troll
        36,     // Mag'har Orc
    ];
    private static readonly RACES_NEUTRAL = [
        24,     // Pandaren
    ];

    // TODO Extract into own service + call endpoint /data/wow/playable-race/{race}
    getFaction(race: number): Observable<Faction> {
        if (CharacterFactionService.RACES_ALLIANCE.includes(race)) {
            return of('ALLIANCE');
        }
        if (CharacterFactionService.RACES_HORDE.includes(race)) {
            return of('HORDE');
        }
        if (CharacterFactionService.RACES_NEUTRAL.includes(race)) {
            return of('NEUTRAL');
        }

        return throwError('Could not find race ' + race);
    }
}
