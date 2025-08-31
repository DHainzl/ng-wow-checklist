import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { forkJoin, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { Region } from '../../core/services/battle-net/battle-net.interface';
import { BattleNetMedia } from '../../core/services/battle-net/character/types/battlenet-media';
import { BattleNetProfile } from '../../core/services/battle-net/character/types/battlenet-profile';
import { CharacterInfo, CharacterIngameData } from '../../core/services/character-store/character-store.interface';
import { CharacterStoreService } from '../../core/services/character-store/character-store.service';
import { Checklist } from '../../core/services/checklist/checklist.interface';
import { ChecklistService } from '../../core/services/checklist/checklist.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';
import { IngameImportDialogComponent } from './import-dialog/ingame-import-dialog.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BattleNetCharacterService } from '../../core/services/battle-net/character/character.service';
import { BattleNetAchievements } from '../../core/services/battle-net/character/types/battlenet-achievement';
import { BattleNetEquipment } from '../../core/services/battle-net/character/types/battlenet-equipment';
import { BattleNetProfessions } from '../../core/services/battle-net/character/types/battlenet-profession';
import { BattleNetQuests } from '../../core/services/battle-net/character/types/battlenet-quest';
import { BattleNetCharacterReputations } from '../../core/services/battle-net/character/types/battlenet-reputation';
import { ChecklistEvaluatorService } from '../../core/services/checklist-evaluator/checklist-evaluator.service';
import { AddTitlePipe } from '../../shared/pipes/add-title.pipe';
import { MediaAssetPipe } from '../../shared/pipes/media-asset.pipe';
import { SafeBackgroundImagePipe } from '../../shared/pipes/safe-background-image.pipe';
import { ChecklistLineComponent } from './checklist-line/checklist-line.component';
import { RemoveCharacterDialogComponent } from './remove-character-dialog/remove-character-dialog.component';

@Component({
    selector: 'app-checklist',
    templateUrl: './checklist.component.html',
    styleUrls: [ '../page-style.scss', './checklist.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule,

        FormsModule,

        MediaAssetPipe,
        SafeBackgroundImagePipe,
        AddTitlePipe,

        ChecklistLineComponent,
    ],
    providers: [ ChecklistEvaluatorService ],
})
export class ChecklistComponent {
    private readonly checklistService = inject(ChecklistService);
    private readonly characterService = inject(BattleNetCharacterService);
    private readonly characterStoreService = inject(CharacterStoreService);
    private readonly localStorageService = inject(LocalStorageService);
    private readonly checklistEvaluatorService = inject(ChecklistEvaluatorService);

    private readonly dialog = inject(MatDialog);

    private readonly titleService = inject(Title);

    readonly region = input.required<Region>();
    readonly realm = input.required<string>();
    readonly name = input.required<string>();

    readonly loading = signal<boolean>(true);
    readonly error = signal<string>('');

    readonly hideCompleted = signal<boolean>(this.localStorageService.get('hideCompleted') || false);
    readonly hideCompletedToggle = signal<boolean[]>([ false ]);

    readonly quests = signal<BattleNetQuests | undefined>(undefined);
    readonly professions = signal<BattleNetProfessions | undefined>(undefined);
    readonly reputations = signal<BattleNetCharacterReputations | undefined>(undefined);
    readonly achievements = signal<BattleNetAchievements | undefined>(undefined);
    readonly equipment = signal<BattleNetEquipment | undefined>(undefined);
    readonly media = signal<BattleNetMedia | undefined>(undefined);
    readonly profile = signal<BattleNetProfile | undefined>(undefined);
    readonly characterInfo = signal<CharacterInfo | undefined>(undefined);
    readonly ingameData = signal<CharacterIngameData | undefined>(undefined);
    readonly checklist = signal<Checklist | undefined>(undefined);
    
    readonly availableChecklists = computed(() => {
        const profile = this.profile();

        if (!profile) {
            return [];
        }

        return this.checklistService.getAvailableChecklists(profile);
    })

    readonly checklistItems = computed(() => {
        if (this.loading()) {
            return [];
        }

        return this.checklistEvaluatorService.evaluate(this.checklist()!, {
            quests: this.quests()!,
            professions: this.professions()!,
            reputations: this.reputations()!,
            achievements: this.achievements()!,
            equipment: this.equipment()!,
            media: this.media()!,
            profile: this.profile()!,
            characterInfo: this.characterInfo()!,
            ingameData: this.ingameData()!,
            allItems: this.checklist()!.items,
        });
    });
    readonly allCompleted = computed(() => {
        const incompleteItems = this.checklistItems()
            .filter(item => item.shown && item.completed !== 'complete');
        return incompleteItems.length === 0;
    })


    constructor() {
        effect(() => this.loadData());
        effect(() => this.updateTitle());
    }

    refresh(): void {
        this.loadData(false);
    }

    import(): void {
        const dialogRef = this.dialog.open(IngameImportDialogComponent, {
            data: {
                region: this.region(),
                realm: this.realm(),
                name: this.name(),
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadData();
            }
        });
    }

    enableChecklist(checklistId: string): void {
        const newCharacterInfo = {
            ...this.characterInfo()!,
            checklistId,
        };

        this.characterStoreService.setCharacter(newCharacterInfo).subscribe(() => this.loadData());
    }

    private loadData(cached: boolean = true): void {
        this.loading.set(true);
        this.error.set('');
        this.titleService.setTitle(`WoW Checklist`);

        const region = this.region();
        const realm = this.realm();
        const name = this.name();

        this.characterStoreService.getCharacter(region, realm, name).pipe(
            tap(characterInfo => this.characterInfo.set(characterInfo)),
            mergeMap(characterInfo => {
                return forkJoin([
                    this.characterService.getAchievement(region, realm, name, cached),
                    this.characterService.getEquipment(region, realm, name, cached),
                    this.characterService.getMedia(region, realm, name, cached),
                    this.characterService.getProfile(region, realm, name, cached),
                    this.characterService.getReputations(region, realm, name, cached),
                    this.characterService.getCompletedQuests(region, realm, name, cached),
                    this.characterService.getProfessions(region, realm, name, cached),
                    of(this.characterStoreService.getIngameData(region, realm, name)),
                    this.checklistService.getChecklist(characterInfo.checklistId),
                ])
            }),
        ).subscribe({
            next: ([ achievements, equipment, media, profile, reputations, completedQuests, professions, ingameData, checklist ]) => {
                this.achievements.set(achievements);
                this.equipment.set(equipment);
                this.media.set(media);
                this.profile.set(profile);
                this.reputations.set(reputations);
                this.quests.set(completedQuests);
                this.professions.set(professions);
                this.ingameData.set(ingameData);
                this.checklist.set(checklist);

                this.loading.set(false);
            
                // const completedChanged: Observable<boolean>[] = [];

                // const items = checklist.items
                //     .filter(item => this.isInRightCovenant(item))
                //     .filter(item => this.isRightClass(item));

                // items.forEach(item => {
                //     item.handler = this.checklistHandlerService.getHandler(item, items);

                //     const completedAndVisible$ = combineLatest([
                //         item.handler.completed.pipe(distinctUntilChanged()),
                //         item.handler.shown.pipe(distinctUntilChanged()),
                //     ]).pipe(
                //         map(([ completionStatus, isShown ]) => {
                //             if (!isShown) {
                //                 return true;
                //             }

                //             return completionStatus === 'complete';
                //         }),
                //     );

                //     completedChanged.push(completedAndVisible$);
                // });

                // this.subscriptions.add(combineLatest(completedChanged).pipe(
                //     map(completionStatus => completionStatus.every(status => status)),
                //     distinctUntilChanged(),
                // ).subscribe(allCompleted => {
                //     this.allCompleted.set(allCompleted);
                // }));

                // this.checklist.set(items);
            },
            error: error => {
                this.error.set(error);
            },
        });
    }

    toggleHideCompleted(): void {
        const value = !this.hideCompleted();

        this.hideCompleted.set(value);
        this.localStorageService.set('hideCompleted', value);
    }

    openDeletionDialog(): void {
        this.dialog.open(RemoveCharacterDialogComponent, {
            width: '400px',
            data: this.characterInfo(),
        });
    }

    private updateTitle(): void {
        const profile = this.profile();

        if (!profile) {
            return;
        }

        const title = `${profile.name} @ ${this.region().toUpperCase()}-${profile.realm.name} :: WoW Checklist`;
        this.titleService.setTitle(title);
    }
}
