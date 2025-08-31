import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EvaluatedChecklistItem } from '../../../core/services/checklist-evaluator/evaluated-checklist-item.interface';

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
export class ChecklistLineComponent {
    readonly item = input.required<EvaluatedChecklistItem>();
    readonly hideCompleted = input.required<boolean>();

    readonly visible = computed(() => this.item().shown && (this.item().completed != 'complete' || !this.hideCompleted()));
    readonly hasDivider = computed(() => {
        const item = this.item().baseItem;
        return item.type === 'header' && item.level === 0;
    });

    noNavHref = `${window?.location.href}#`;            // Necessary for wowhead tooltips

    readonly icon = computed(() => {
        switch(this.item().completed) {
            case 'complete': return 'check';
            case 'incomplete': return 'close';
            case 'loading': return 'sync';
            default: return '';
        }
    })

    runOnClick(): void {
        const note = this.item().note;
        if (note?.type === 'button') {
            note.onClick().subscribe(() => {});
        }
    }
}
