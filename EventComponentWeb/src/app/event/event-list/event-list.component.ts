import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { eventEntity } from '../models/evententity.model';
import { EventService } from '../services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  onEventList: Observable<eventEntity[]>;
  constructor(public eventService: EventService) {
    this.onEventList = this.eventService.OnEventList();
  }
}
