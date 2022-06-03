import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { peopleEntity } from '../models/peopleEntity';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent{
 onPeopleList: Observable<peopleEntity[]>;
constructor(public eventService: PeopleService) {
  this.onPeopleList = this.eventService.OnPeopleList();
}
}
