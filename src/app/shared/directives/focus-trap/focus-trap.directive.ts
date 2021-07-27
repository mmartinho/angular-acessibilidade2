import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appFocusTrap]',
})
export class FocusTrapDirective implements AfterViewInit {
  /** */
  private firstFocusableEmement: HTMLElement = null;
  /** */
  private lastFocusableElement: HTMLElement = null;

  /**
   * @param elementRef
   */
  constructor(private elementRef: ElementRef<any>) {}

  /**
   *
   */
  public ngAfterViewInit(): void {
    /**
     * Lista de todos os elementos passíveis de foco,
     * e que não estejam desabilitados
     */
    const focusableElements = this.elementRef.nativeElement.querySelectorAll(`
      [tabindex]:not([tabindex="-1"]),
      a[href]:not([disabled]),
      button:not([disabled]),
      textarea:not([disabled]),
      input:not([disabled]),
      select:not([disabled])`
    ) as Array<HTMLElement>;

    if (focusableElements.length > 0) {
      this.firstFocusableEmement = focusableElements[0];
      this.lastFocusableElement = focusableElements[focusableElements.length - 1];
      this.firstFocusableEmement.focus();
    }
  }

  /**
   * Ouve eventos de pressionamento da tecla tab
   * no escopo do elemento host
   *
   * @param event O Evento de teclado disparado
   */
  @HostListener('keydown', ['$event'])
  public manageTab(event: KeyboardEvent): void {
    /** Diferente de tab, retorna */
    if(event.key !== 'Tab') {
      return;
    }
    /** Shift+Tab: volta pro útimo elemento se é o primeiro elemento */
    if(event.shiftKey && document.activeElement === this.firstFocusableEmement) {
      this.lastFocusableElement.focus();
      event.preventDefault();
    /** Volta pro primeiro se é o último elemento */
    } else if(document.activeElement === this.lastFocusableElement) {
      this.firstFocusableEmement.focus();
      event.preventDefault();
    }
  }
}
