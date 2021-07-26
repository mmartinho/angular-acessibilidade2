import { animate, style, transition, trigger } from '@angular/animations';

/** 
 * Gatilho "fade" 
 */
export const fade = trigger('fade', [
  /** Transição ao entrar no DOM */  
  transition(':enter', [
    /** Inicia com opacity 0... */  
    style({ opacity: 0 }),
    /** ...anima durante 1s, e vai até opacity 1 */
    animate(1000, style({ opacity: 1 })),
  ]),
  /** Transição ao sair do DOM */  
  transition(':leave', [
    /** Anima durante 1s, até a opacity 0 */
    animate(1000, style({ opacity: 0 })),
  ]),  
]);
