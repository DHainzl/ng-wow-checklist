import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterImage'
})
export class CharacterImagePipe implements PipeTransform {
    transform(url: string, region: string): any {
        return `http://render-${region}.worldofwarcraft.com/character/${url}`;
    }
}
