import { TestBed } from '@angular/core/testing';

import { GlobalMessageService } from './global-message.service';
import { MessageService } from 'primeng/api';

describe('GlobalMessageService', () => {
  let service: GlobalMessageService;
  let messageService: Partial<MessageService>;

  beforeEach(() => {
    const mockMessageService = {
      add: jest.fn(),
    } as Partial<MessageService>;

    TestBed.configureTestingModule({
      providers: [
        GlobalMessageService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    service = TestBed.inject(GlobalMessageService);
    messageService = TestBed.inject(MessageService) as Partial<MessageService>;
  });

  it('should add a success message', () => {
    const detail = 'Operation completed successfully';
    service.addSuccessMessage(detail);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Sucesso',
      detail,
    });
  });

  it('should add an error message', () => {
    const detail = 'An error occurred';
    service.addErrorMessage(detail);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Erro',
      detail,
    });
  });

  it('should add a warning message', () => {
    const detail = 'This is a warning';
    service.addWarningMessage(detail);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Aviso',
      detail,
    });
  });

  it('should add an info message', () => {
    const detail = 'This is an information message';
    service.addInfoMessage(detail);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Informação',
      detail,
    });
  });
});
