import { TestBed } from '@angular/core/testing';

import { DadJokesService } from './dad-jokes.service';

describe('DadJokesService', () => {
  let service: DadJokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadJokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
