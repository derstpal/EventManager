import { Component, Input, OnInit } from '@angular/core';
import { eventEntity } from '../models/evententity.model';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent  implements OnInit {
  @Input() event: eventEntity | undefined;

  constructor() {}

  ngOnInit(): void {}

}
