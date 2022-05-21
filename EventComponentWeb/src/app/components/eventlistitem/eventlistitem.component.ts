import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { eventEntity } from 'src/app/models/evententity.model';

@Component({
  selector: 'app-eventlistitem',
  templateUrl: './eventlistitem.component.html',
  styleUrls: ['./eventlistitem.component.scss']
})
export class EventlistitemComponent implements OnInit {
  @Input() event: eventEntity | undefined;

  constructor() {}

  ngOnInit(): void {}

}
