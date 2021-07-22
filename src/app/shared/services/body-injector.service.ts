import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyInjectorService {
  /**
   * @param appRef 
   */
  constructor(private appRef: ApplicationRef) { }

  /**
   * Insere o componente antes do seletor da aplicação (app-root)
   * @param componentRef 
   */
  public stackBeforeAppRoot(componentRef: ComponentRef<any>): void {
    const domElement = this.createDomElement(componentRef);
    /** Pega a referencia do appRoot */
    const appRoot = document.body.querySelector('app-root');
    /** Posiciona o domElement antes de appRoot */
    document.body.insertBefore(domElement, appRoot);
  }

  /**
   * @param componentRef 
   * @returns 
   */
  private createDomElement(componentRef: ComponentRef<any>): HTMLElement {
    /** 
     * hostview: é uma referencia para o template do 
     * componente encapsulado por ComponentRef 
     */
    this.appRef.attachView(componentRef.hostView); 
    /**
     * EmbeddedViewRef é uma subclasse de ViewRef que se refere 
     * aos elementos dentro do container do componente
     */
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    return domElement;
  }
}
