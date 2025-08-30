import { ChangeDetectionStrategy, Component, computed, input, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ChecklistNote } from '../../../core/services/checklist-evaluator/handlers/_handler.interface';
import { ChecklistItem } from '../../../core/services/checklist/checklist.interface';

@Component({
    selector: 'checklist-line',
    templateUrl: './checklist-line.component.html',
    styleUrls: [ './checklist-line.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatButtonModule,
    ],
    host: {
        '[class.divider-top]': 'visible() && hasDivider()'
    }
})
export class ChecklistLineComponent implements OnInit, OnDestroy {
    readonly item = input.required<ChecklistItem>();
    readonly hideCompleted = input.required<boolean>();

    readonly shown = signal<boolean | undefined>(undefined);
    readonly completed = signal<string | undefined>(undefined);
    readonly label = signal<string | undefined>(undefined);
    readonly note = signal<ChecklistNote | undefined>(undefined);
    readonly subitems = signal<string[] | undefined>(undefined);
    readonly wowheadId = signal<string | undefined>(undefined);
    readonly indention = signal<number | undefined>(undefined);

    readonly handler = computed(() => this.item().handler!);
    readonly visible = computed(() => this.shown() && (this.completed() != 'complete' || !this.hideCompleted()));
    readonly hasDivider = computed(() => {
        const item = this.item();
        return item.type === 'header' && item.level === 0;
    });

    noNavHref = `${window?.location.href}#`;            // Necessary for wowhead tooltips

    readonly icon = computed(() => {
        switch(this.completed()) {
            case 'complete': return 'check';
            case 'incomplete': return 'close';
            case 'loading': return 'sync';
            default: return '';
        }
    })

    private readonly subscriptions: Subscription = new Subscription();

    ngOnInit(): void {
        this.handler().handlerInit();

        this.subscribe(this.handler().shown, shown => this.shown.set(shown));
        this.subscribe(this.handler().completed, completed => this.completed.set(completed));
        this.subscribe(this.handler().label, label => this.label.set(label));
        this.subscribe(this.handler().note, note => this.note.set(note));
        this.subscribe(this.handler().subitems, subitems => this.subitems.set(subitems));
        this.subscribe(this.handler().wowheadId, wowheadId => this.wowheadId.set(wowheadId));
        this.subscribe(this.handler().indention, indention => this.indention.set(indention));
    }

    ngOnDestroy(): void {
        this.handler().handlerDestroy();

        this.subscriptions.unsubscribe();
    }

    runOnClick(): void {
        const note = this.note()!;
        if (note.type === 'button') {
            note.onClick().subscribe(() => {});
        }
    }

    private subscribe<T>(observable: Observable<T>, setProperty: (result: T) => void): void {
        this.subscriptions.add(observable.pipe(distinctUntilChanged()).subscribe(result => {
            setProperty(result);
        }));
    }
}
