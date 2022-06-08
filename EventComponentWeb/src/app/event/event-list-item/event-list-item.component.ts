import { Component, Input } from '@angular/core';
import { eventEntity } from '../models/evententity.model';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss'],
})
export class EventListItemComponent {
  @Input() event!: eventEntity;
  @Input() hasSelection: Boolean = false;
  constructor() {}
}
