import { Component, HostBinding, OnInit } from '@angular/core';

import { ModalConfig } from './interfaces/modal-config';
import { fade } from './../../animations/fade';
import { ModalRef } from './models/modal-ref';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  /** 
   * Trigger que dispara a animação do componente
   * @see src\app\shared\animations\fade.ts 
   */
  animations: [fade]
})
export class ModalComponent implements OnInit {
  /** 
   * Associa o host do componente ao disparador 
   * da animação "fade", deixando-o sempre "ligado"
   * (true) 
   */
  @HostBinding('@fade')
  fade = true;
  
  /** 
   * Configuração do modal (título e template) 
   */
  public config: ModalConfig;

  /**
   * Referência do modal
   */
  public modalRef: ModalRef

  constructor() { }

  ngOnInit(): void {}
}
