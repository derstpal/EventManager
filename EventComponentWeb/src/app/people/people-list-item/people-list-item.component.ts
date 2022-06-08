import { peopleEntity } from './../models/peopleEntity';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-people-list-item',
  templateUrl: './people-list-item.component.html',
  styleUrls: ['./people-list-item.component.scss'],
})
export class PeopleListItemComponent {
  @Input() people: peopleEntity | undefined;
  @Input() hasSelection: Boolean | undefined;

  @Output() isSelectedChange = new EventEmitter<boolean>();
  @Input() isSelected: Boolean | undefined;

  background: string = 'transparent';

  today: moment.Moment = moment(new Date());
  constructor() {}

  onSelectChange(value: boolean) {
    this.isSelected = value;
    this.background = value ? '#0d6efd' : 'transparent';
    console.log(`Selection ${this.isSelected} on ${this.people?.key}`);
    this.isSelectedChange.emit(value);
    if (this.people) {
      this.people.isSelected = value;
    }
  }
}
