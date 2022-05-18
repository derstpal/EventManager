import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { eventEntity } from '../models/evententity.model';

@Injectable()
export class EventService {
  constructor() {}

  private events: eventEntity[] = [
    new eventEntity('Wedding J&T', new Date(2022, 12, 12), 1),
    new eventEntity('Birthday', new Date(2022, 12, 12), 1),
  ];

  public eventsSubject: Subject<eventEntity[]> = new Subject<eventEntity[]>();

  public emitEventsSubject() {
    this.eventsSubject.next(this.events);
  }
}
