import { peopleEntity } from './../models/peopleEntity';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-list-item',
  templateUrl: './people-list-item.component.html',
  styleUrls: ['./people-list-item.component.scss']
})
export class PeopleListItemComponent{
  @Input() people: peopleEntity | undefined;

  constructor() { }
}
