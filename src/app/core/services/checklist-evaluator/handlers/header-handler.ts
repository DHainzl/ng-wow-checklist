import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChecklistItem, ChecklistItemHeader } from '../../checklist/checklist.interface';
import { ChecklistHandler } from './_handler';
import { CompletionStatus } from './_handler.interface';

export class ChecklistHeaderHandler extends ChecklistHandler<ChecklistItemHeader> {
    private numItems: number = 0;
    private completeItems: number = 0;

    subscription: Subscription = new Subscription();

    handlerInit(): void {
        const subitems = this.findSubitems();

        if (subitems.length === 0) {
            this._shown$.next(false);
        }

        this._label$.next(this.getHeader());
        
        this.subscription = combineLatest(this.getSubitemSubscriptions(subitems))
        .subscribe(allStatus => {
            const shownStatus = allStatus.filter(s => s.shown).map(s => s.completed);
        
            const isLoading = shownStatus.includes('loading');
            if (isLoading) {
                this._completed$.next('loading');
                return;
            }

            this.numItems = shownStatus.length;
            this.completeItems = shownStatus.filter(c => c === 'complete').length;
            const isCompleted = shownStatus.every(c => c === 'complete');

            this._completed$.next(isCompleted ? 'complete' : 'incomplete');
            this._label$.next(this.getHeader());
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getHeader(): string {
        const tag = 'h' + (this.item.level + 2);
        return `<${tag}>${this.item.name} (${this.completeItems} / ${this.numItems})</${tag}>`;
    }

    private getSubitemSubscriptions(subitems: ChecklistItem[]): Observable<{ shown: boolean, completed: CompletionStatus }>[] {
        return subitems
            .filter(subitem => subitem.type !== 'header')
            .map(subitem => {
                return combineLatest([ subitem.handler!.shown, subitem.handler!.completed ]).pipe(
                    map(([ shown, completed ]) => ({ shown, completed })),
                );
            });
    }

    private findSubitems(): ChecklistItem[] {
        const currentIndex = this.allItems.findIndex(item => item.key === this.item.key);
        if (currentIndex + 1 >= this.allItems.length) {
            return [];
        }

        const fromCurrent = this.allItems.slice(currentIndex + 1);
        const nextIndex = fromCurrent.findIndex(item => item.type === 'header' && item.level <= this.item.level);

        if (nextIndex !== -1) {
            return fromCurrent.slice(0, nextIndex);
        }
        return fromCurrent;
    }
}
