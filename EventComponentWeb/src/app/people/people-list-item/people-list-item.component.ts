import { peopleEntity } from './../models/peopleEntity';
import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-people-list-item',
  templateUrl: './people-list-item.component.html',
  styleUrls: ['./people-list-item.component.scss'],
})
export class PeopleListItemComponent {
  @Input() people: peopleEntity | undefined;
  today: moment.Moment = moment(new Date());
  constructor() {}
}
