import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { eventEntity } from 'src/app/models/evententity.model';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  onEventList: Observable<eventEntity[]>;
  constructor(public eventService: EventService) {
    this.onEventList = this.eventService.OnEventList();
  }
}
