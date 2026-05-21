import { animate, query, style, transition, trigger } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(18px)' })
    ], { optional: true }),
    query(':leave', [
      animate('140ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' }))
    ], { optional: true }),
    query(':enter', [
      animate('420ms cubic-bezier(.2,.8,.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);
