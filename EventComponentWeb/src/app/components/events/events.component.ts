import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { eventEntity } from 'src/app/models/evententity.model';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  events: eventEntity[] | undefined;
  private eventsSubscription: Subscription | undefined;

  constructor(private eventService: EventService) {
    this.events = undefined;
  }
  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    console.log('rrtregfegdfg');
    this.eventsSubscription = this.eventService.eventsSubject.subscribe(
      (result) => {
        this.events = result;
      }
    );
    this.eventService.emitEventsSubject();
  }
}
