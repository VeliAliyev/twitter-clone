import { TestBed } from '@angular/core/testing';

import { RetweetService } from './retweet.service';

describe('RetweetService', () => {
  let service: RetweetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetweetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
