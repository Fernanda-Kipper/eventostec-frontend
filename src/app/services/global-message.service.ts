import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class GlobalMessageService {
  constructor(private messageService: MessageService) {}

  addSuccessMessage(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail,
    });
  }

  addErrorMessage(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail });
  }

  addWarningMessage(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Aviso', detail });
  }

  addInfoMessage(detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Informação',
      detail,
    });
  }
}
