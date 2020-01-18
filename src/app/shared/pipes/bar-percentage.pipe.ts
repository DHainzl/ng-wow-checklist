import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'barPercentage',
})
export class BarPercentagePipe implements PipeTransform {
    transform(value: number, maxLevel: number): string {
        const ratio = Math.min(value / maxLevel, 1);

        return `${ratio * 100}%`;
    }
}
