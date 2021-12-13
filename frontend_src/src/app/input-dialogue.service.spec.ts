import { TestBed } from '@angular/core/testing';

import { InputDialogueService } from './input-dialogue.service';

describe('InputDialogueService', () => {
  let service: InputDialogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputDialogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
