import { ChangeDetectionStrategy, Component, effect, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, mergeMap } from 'rxjs/operators';

import { Region } from '../../core/services/battle-net/battle-net.interface';
import { BattleNetMedia } from '../../core/services/battle-net/character/types/battlenet-media';
import { BattleNetProfile } from '../../core/services/battle-net/character/types/battlenet-profile';
import { CharacterInfo } from '../../core/services/character-store/character-store.interface';
import { CharacterStoreService } from '../../core/services/character-store/character-store.service';
import { ChecklistHandlerService } from '../../core/services/checklist-evaluator/handlers/checklist-handler.service';
import { ChecklistItem } from '../../core/services/checklist/checklist.interface';
import { ChecklistService } from '../../core/services/checklist/checklist.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';
import { IngameImportDialogComponent } from './import-dialog/ingame-import-dialog.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChecklistRequestContainerService } from '../../core/services/checklist-evaluator/checklist-request-container.service';
import { AddTitlePipe } from '../../shared/pipes/add-title.pipe';
import { MediaAssetPipe } from '../../shared/pipes/media-asset.pipe';
import { SafeBackgroundImagePipe } from '../../shared/pipes/safe-background-image.pipe';
import { ChecklistLineComponent } from './checklist-line/checklist-line.component';

@Component({
    selector: 'app-checklist',
    templateUrl: './checklist.component.html',
    styleUrls: [ '../page-style.scss', './checklist.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatCheckboxModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,

        FormsModule,

        MediaAssetPipe,
        SafeBackgroundImagePipe,
        AddTitlePipe,

        ChecklistLineComponent,
    ],
})
export class ChecklistComponent implements OnInit, OnDestroy {
    private readonly checklistHandlerService = inject(ChecklistHandlerService);
    private readonly checklistRequestContainerService = inject(ChecklistRequestContainerService);
    private readonly checklistService = inject(ChecklistService);
    private readonly characterStoreService = inject(CharacterStoreService);
    private readonly localStorageService = inject(LocalStorageService);

    private readonly dialog = inject(MatDialog);

    private readonly titleService = inject(Title);

    readonly region = input.required<Region>();
    readonly realm = input.required<string>();
    readonly name = input.required<string>();

    readonly loading = signal<boolean>(true);
    readonly error = signal<string>('');

    readonly allCompleted = signal<boolean>(false);
    readonly hideCompleted = signal<boolean>(this.localStorageService.get('hideCompleted') || false);

    readonly checklist = signal<ChecklistItem[]>([]);
    private characterInfo: CharacterInfo | undefined;

    readonly media = signal<BattleNetMedia | undefined>(undefined);
    readonly profile = signal<BattleNetProfile | undefined>(undefined);

    private subscriptions: Subscription = new Subscription();

    constructor() {
        effect(() => this.loadData());
    }

    ngOnInit(): void {
        this.subscriptions.add(this.checklistRequestContainerService.mediaChanged.subscribe(media => this.media.set(media)));
        this.subscriptions.add(this.checklistRequestContainerService.profileChanged.subscribe(profile => {
            this.profile.set(profile);

            if (!profile) {
                return;
            }

            const title = `${profile.name} @ ${this.region().toUpperCase()}-${profile.realm.name} :: WoW Checklist`;
            this.titleService.setTitle(title);
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
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

    private loadData(cached: boolean = true): void {
        this.loading.set(true);
        this.error.set('');
        this.titleService.setTitle(`WoW Checklist`);

        this.characterStoreService.getCharacter(this.region(), this.realm(), this.name()).pipe(
            mergeMap(characterInfo => {
                this.characterInfo = characterInfo;

                return this.checklistRequestContainerService.load(this.region(), this.realm(), this.name(), characterInfo, cached);
            }),
            mergeMap(() => {
                this.loading.set(false);
                return this.checklistService.getChecklist(this.characterInfo!.checklistId);
            }),
        ).subscribe({
            next: checklist => {
                this.loading.set(false);
                const completedChanged: Observable<boolean>[] = [];

                const items = checklist.items
                    .filter(item => this.isInRightCovenant(item))
                    .filter(item => this.isRightClass(item));

                items.forEach(item => {
                    item.handler = this.checklistHandlerService.getHandler(item, items);

                    const completedAndVisible$ = combineLatest([
                        item.handler.completed.pipe(distinctUntilChanged()),
                        item.handler.shown.pipe(distinctUntilChanged()),
                    ]).pipe(
                        map(([ completionStatus, isShown ]) => {
                            if (!isShown) {
                                return true;
                            }

                            return completionStatus === 'complete';
                        }),
                    );

                    completedChanged.push(completedAndVisible$);
                });

                this.subscriptions.add(combineLatest(completedChanged).pipe(
                    map(completionStatus => completionStatus.every(status => status)),
                    distinctUntilChanged(),
                ).subscribe(allCompleted => {
                    this.allCompleted.set(allCompleted);
                }));

                this.checklist.set(items);
            },
            error: error => {
                this.error.set(error);
            },
        });
    }

    hideCompletedChange(value: boolean): void {
        this.localStorageService.set('hideCompleted', value);
    }

    private isInRightCovenant(item: ChecklistItem): boolean {
        if (!item.covenant) {
            return true;
        }

        if (!this.profile()) {
            return false;
        }

        return item.covenant === this.profile()!.covenant_progress?.chosen_covenant?.name;
    }

    private isRightClass(item: ChecklistItem): boolean {
        if (!item.classes?.length) {
            return true;
        }

        if (!this.profile()) {
            return false;
        }

        return !!item.classes.find(cls => this.profile()!.character_class.name === cls);
    }
}
