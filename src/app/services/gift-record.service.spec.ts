import { TestBed } from '@angular/core/testing';

import { GiftRecordService } from './gift-record.service';

describe('GiftRecordService', () => {
  let service: GiftRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
