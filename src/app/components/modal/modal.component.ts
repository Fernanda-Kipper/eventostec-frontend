import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isModalOpen!: WritableSignal<boolean>;
  @Output() closeModal = new EventEmitter();

  close(){
    this.closeModal.emit();
  }
}
