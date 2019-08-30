import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ChecklistHandler } from 'src/app/services/checklist-evaluator/handlers/_handler';
import { ChecklistNote, CompletionStatus } from 'src/app/services/checklist-evaluator/handlers/_handler.interface';
import { ChecklistItem } from 'src/app/services/checklist/checklist.interface';

@Component({
    selector: 'checklist-line',
    templateUrl: './checklist-line.component.html',
    styleUrls: [ './checklist-line.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistLineComponent implements OnInit, OnDestroy {
    @Input()
    handler: ChecklistHandler<ChecklistItem>;

    @Input()
    hideCompleted: boolean;

    shown: boolean;
    completed: CompletionStatus;
    label: string;
    note: ChecklistNote;
    subitems: string[];
    wowheadId: string;
    indention: number;

    private subscriptions: Subscription = new Subscription();

    constructor(
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.handler.handlerInit();

        this.subscribe(this.handler.shown, shown => this.shown = shown);
        this.subscribe(this.handler.completed, completed => this.completed = completed);
        this.subscribe(this.handler.label, label => this.label = label);
        this.subscribe(this.handler.note, note => this.note = note);
        this.subscribe(this.handler.subitems, subitems => this.subitems = subitems);
        this.subscribe(this.handler.wowheadId, wowheadId => this.wowheadId = wowheadId);
        this.subscribe(this.handler.indention, indention => this.indention = indention);
    }

    ngOnDestroy(): void {
        this.handler.handlerDestroy();

        this.subscriptions.unsubscribe();
    }

    runOnClick(): void {
        if (this.note.type === 'button') {
            this.note.onClick().subscribe(() => {});
        }
    }

    private subscribe<T>(observable: Observable<T>, setProperty: (result: T) => void): void {
        this.subscriptions.add(observable.pipe(distinctUntilChanged()).subscribe(result => {
            setProperty(result);
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        }));
    }
}
