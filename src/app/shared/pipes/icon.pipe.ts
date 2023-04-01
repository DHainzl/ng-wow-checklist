import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'icon',
})
export class IconPipe implements PipeTransform {
    transform(fileName: string, category: 'gear-slot') {
        return `url('/assets/icons/${category}/${fileName}.webp')`;
    }
}
