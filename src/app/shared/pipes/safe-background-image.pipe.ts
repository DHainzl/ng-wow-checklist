import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
    name: 'safeBackgroundImage',
})
export class SafeBackgroundImagePipe implements PipeTransform {
    private readonly sanitizer = inject(DomSanitizer);

    transform(url: string): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
    }
}
