import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { FocusTrapModule } from './../../directives/focus-trap/focus-trap.module';
import { FocusBackModule } from './../../directives/focus-back/focus-back.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, FocusTrapModule, FocusBackModule],
  exports: [ModalComponent],
})
export class ModalModule {}
