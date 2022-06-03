import { TestBed } from '@angular/core/testing';

import { PeopleInEventService } from './people-in-event.service';

describe('PeopleInEventService', () => {
  let service: PeopleInEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleInEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
