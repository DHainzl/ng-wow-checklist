import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChecklistItem, ChecklistItemHeader } from 'src/app/services/checklist/checklist.interface';

import { ChecklistHandler } from './_handler';
import { CompletionStatus } from './_handler.interface';

export class ChecklistHeaderHandler extends ChecklistHandler<ChecklistItemHeader> {
    subscription: Subscription = new Subscription();

    handlerInit(): void {
        this._label$.next(this.getHeader());

        this.subscription = combineLatest(this.getSubitemSubscriptions()).subscribe(allStatus => {
            const isLoading = allStatus.includes('loading');
            if (isLoading) {
                this._completed$.next('loading');
                return;
            }

            const isCompleted = allStatus.every(c => c === 'complete');
            this._completed$.next(isCompleted ? 'complete' : 'incomplete');
        });
    }

    handlerDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getHeader(): string {
        const tag = 'h' + (this.item.level + 2);
        return `<${tag}>${this.item.name}</${tag}>`;
    }

    private getSubitemSubscriptions(): Observable<CompletionStatus>[] {
        return this.findSubitems().map(subitem => {
            return combineLatest(subitem.handler.shown, subitem.handler.completed).pipe(
                map(([ shown, completed ]) => {
                    if (!shown) {
                        // If it's not shown we assume completed to not taint summary
                        const status: CompletionStatus = 'complete';
                        return status;
                    }
                    return completed;
                }),
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
