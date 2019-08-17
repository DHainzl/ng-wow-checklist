import { animate, animation, style } from '@angular/animations';

export const slideEnterAnimation = animation([
    style({ height: '0', opacity: 0 }),
    animate('{{ time }} ease-in', style({ height: '*', opacity: 1 })),
]);

export const slideLeaveAnimation = animation([
    style({ height: '*', opacity: 1 }),
    animate('{{ time }} ease-out', style({ height: '0', opacity: 0 })),
]);
