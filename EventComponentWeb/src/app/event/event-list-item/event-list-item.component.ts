import { Component, Input, EventEmitter, Output } from '@angular/core';
import { eventEntity } from '../models/evententity.model';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss'],
})
export class EventListItemComponent {
  @Input() event!: eventEntity;
  @Input() hasSelection: Boolean = false;
  @Input() isSelected: Boolean = false;
  @Output() isSelectedChange: EventEmitter<Boolean> =
    new EventEmitter<Boolean>();
  constructor() {}

  select (value : Boolean){
    this.isSelectedChange.emit(value);
  }
}
