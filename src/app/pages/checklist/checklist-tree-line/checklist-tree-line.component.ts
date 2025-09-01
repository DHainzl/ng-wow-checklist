import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, viewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChecklistEvaluatorService } from '../../../core/services/checklist-evaluator/checklist-evaluator.service';
import { ChecklistNote, CompletionStatus } from '../../../core/services/checklist-evaluator/handlers/_handler.interface';
import { ChecklistItem } from '../../../core/services/checklist/checklist.interface';
import { ChecklistResponses } from '../checklist-responses.interface';

@Component({
    selector: 'checklist-tree-line',
    templateUrl: './checklist-tree-line.component.html',
    styleUrls: [ './checklist-tree-line.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatButtonModule,
    ],
    host: {
        '[class.checklist-card]': 'visible()',
    }
})
export class ChecklistTreeLineComponent {
    private readonly checklistEvaluatorService = inject(ChecklistEvaluatorService);

    readonly item = input.required<ChecklistItem>();
    readonly hideCompleted = input.required<boolean>();
    readonly responses = input.required<ChecklistResponses>();
    readonly indention = input<number>(0);

    readonly subItemComponents = viewChildren(ChecklistTreeLineComponent);

    readonly shown = signal<boolean>(false);
    readonly completed = signal<CompletionStatus>('loading');
    readonly label = signal<string>('');
    readonly note = signal<ChecklistNote | undefined>(undefined);
    readonly subitems = signal<string[]>([]);
    readonly wowheadId = signal<string>('');

    readonly visible = computed(() => this.shown() && (this.completed() != 'complete' || !this.hideCompleted()));

    readonly icon = computed(() => {
        switch(this.completed()) {
            case 'complete': return 'check';
            case 'incomplete': return 'close';
            case 'loading': return 'sync';
            default: return '';
        }
    });

    readonly totalItems = computed<number>(() => {
        if (!this.subItemComponents().length) {
            return 1;
        }

        return this.subItemComponents()
            .filter(comp => comp.shown())
            .reduce((total, comp) => {
                const childCount: number = comp!.totalItems();
                return total + childCount;
            }, 0);
    });

    readonly completedItems = computed<number>(() => {
        if (!this.subItemComponents().length) {
            return 0;
        }

        return this.subItemComponents()
            .filter(comp => comp.shown() && comp.completed() === 'complete')
            .reduce((total, comp) => {
                const childCount: number = comp!.totalItems();
                return total + childCount;
            }, 0);
    });

    readonly loadingItems = computed<number>(() => {
        if (!this.subItemComponents().length) {
            return 0;
        }

        return this.subItemComponents()
            .filter(comp => comp.shown() && comp.completed() === 'loading')
            .reduce((total, comp) => {
                const childCount: number = comp!.totalItems();
                return total + childCount;
            }, 0);
    });


    readonly noNavHref = `${window?.location.href}#`;            // Necessary for wowhead tooltips

    constructor() {
        effect(() => this.evaluateItem());
        effect(() => this.updateHeaderFields());
    }

    private evaluateItem(): void {
        if (this.item().type === 'header') {
            return;
        }

        const handler = this.checklistEvaluatorService.getHandler(this.item(), this.responses());

        const result = handler.evaluate();

        this.shown.set(result.shown);
        this.completed.set(result.completed);
        this.label.set(result.label);
        this.note.set(result.note);
        this.subitems.set(result.subitems);
        this.wowheadId.set(result.wowheadId);
    }

    private updateHeaderFields(): void {
        if (this.item().type !== 'header') {
            return;
        }

        const isLoading = this.loadingItems() > 0;
        const isComplete = this.completedItems() === this.totalItems();

        const tag = 'h' + (this.indention() + 2);
        const completeItemsLabel = this.totalItems() === 0 ? '' : ` (${this.completedItems()} / ${this.totalItems()})`
        this.label.set(`<${tag}>${this.item().name}${completeItemsLabel}</${tag}>`);

        this.shown.set(this.totalItems() > 0);
        this.completed.set(isLoading ? 'loading' : (isComplete ? 'complete' : 'incomplete'));

        this.wowheadId.set('');
        this.subitems.set([]);
        this.note.set(undefined);
    }

    runOnClick(): void {
        const note = this.note();
        if (note?.type === 'button') {
            note.onClick().subscribe(() => {});
        }
    }
}
