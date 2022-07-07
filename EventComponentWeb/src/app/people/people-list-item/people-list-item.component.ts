import { peopleEntity } from './../models/peopleEntity';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-people-list-item',
  templateUrl: './people-list-item.component.html',
  styleUrls: ['./people-list-item.component.scss'],
})
export class PeopleListItemComponent {
  @Input()
  people!: peopleEntity;
  @Input() hasSelection: Boolean = false;
  today: moment.Moment = moment(new Date());
  @Input() isSelected: Boolean = false;
  @Output() isSelectedChange: EventEmitter<Boolean> =
    new EventEmitter<Boolean>();
  constructor() {}

  select(value: Boolean) {
    this.isSelectedChange.emit(value);
  }
}
