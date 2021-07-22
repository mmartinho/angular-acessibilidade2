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
    const componentRef = this.createComponentref();
    componentRef.instance.config = config;
    this.bodyInjector.stackBeforeAppRoot(componentRef);
    return new ModalRef(componentRef);
  }

  /**
   * @returns
   */
  private createComponentref(): ComponentRef<ModalComponent> {
    return this.componentFactory.create(this.injector);
  }
}

/**
 *
 */
export class ModalRef {
  /**
   * @param componentRef 
   */
  constructor(private componentRef: ComponentRef<ModalComponent>) {}

  /**
   *
   */
  public close(): void {
    this.componentRef.destroy();
  }
}
