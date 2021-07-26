import { ComponentRef } from '@angular/core';

import { ModalComponent } from '../modal.component';

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
