import { BehaviorSubject, Observable } from 'rxjs';
import { CharacterStoreService } from '../../character-store/character-store.service';
import { ChecklistItem, ChecklistItemHeader } from '../../checklist/checklist.interface';
import { ChecklistRequestContainerService } from '../checklist-request-container.service';
import { ChecklistNote, CompletionStatus } from './_handler.interface';

export abstract class ChecklistHandler<T extends ChecklistItem> {
    protected _shown$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    protected _completed$: BehaviorSubject<CompletionStatus> = new BehaviorSubject<CompletionStatus>('loading');
    protected _label$: BehaviorSubject<string> = new BehaviorSubject('');
    protected _note$: BehaviorSubject<ChecklistNote | undefined> = new BehaviorSubject<ChecklistNote | undefined>(undefined);
    protected _subitems$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    protected _wowheadId$: BehaviorSubject<string> = new BehaviorSubject('');
    protected _indention$: BehaviorSubject<number> = new BehaviorSubject(0);

    get shown(): Observable<boolean> { return this._shown$.asObservable(); }
    get completed(): Observable<CompletionStatus> { return this._completed$.asObservable(); }
    get label(): Observable<string> { return this._label$.asObservable(); }
    get note(): Observable<ChecklistNote | undefined> { return this._note$.asObservable(); }
    get subitems(): Observable<string[]> { return this._subitems$.asObservable(); }
    get wowheadId(): Observable<string> { return this._wowheadId$.asObservable(); }
    get indention(): Observable<number> { return this._indention$.asObservable(); }

    constructor(
        protected checklistRequestContainer: ChecklistRequestContainerService,
        protected characterStoreService: CharacterStoreService,
        protected item: T,
        protected allItems: ChecklistItem[],
    ) {
        this._label$.next(this.item.name);
        this._indention$.next(this.getIndention());
    }

    abstract handlerInit(): void;
    abstract handlerDestroy(): void;

    private getIndention(): number {
        if (this.item.type === 'header') {
            return (<ChecklistItemHeader> this.item).level;
        }

        let lastIndention = 0;
        this.allItems.find(item => {
            if (item.type === 'header') {
                lastIndention = item.level;
            }

            return item.key === this.item.key;
        });
        return lastIndention + 1;
    }
}
