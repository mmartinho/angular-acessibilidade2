import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
} from '@angular/core';

import { ModalComponent } from './../modal.component';
import { ModalConfig } from '../interfaces/modal-config';
import { BodyInjectorService } from 'src/app/shared/services/body-injector.service';
import { ModalRef } from '../models/modal-ref';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  /** */
  private componentFactory: ComponentFactory<ModalComponent>;

  /**
   * @param componentFactoryResolver
   * @param injector
   */
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private bodyInjector: BodyInjectorService
  ) {
    this.componentFactory =
      componentFactoryResolver.resolveComponentFactory(ModalComponent);
  }

  /**
   * @param config
   */
  public open(config: ModalConfig): ModalRef {
    /** Cria a instância do componente e retorna sua referência */
    const componentRef = this.createComponentref();
    /** Passa a config para a instância do componente */
    componentRef.instance.config = config; 
    /** Posiciona o componente antes do app root */
    this.bodyInjector.stackBeforeAppRoot(componentRef);
    /** Cria objeto do modal baseado na referência do coponente */
    const modalRef = new ModalRef(componentRef);
    /** 
     * Salva a referencia do modal na instancia do componente. 
     * Dessa forma, o componente pode acessar o modal
     */
    componentRef.instance.modalRef = modalRef;
    return modalRef;
  }

  /**
   * @returns
   */
  private createComponentref(): ComponentRef<ModalComponent> {
    return this.componentFactory.create(this.injector);
  }
}