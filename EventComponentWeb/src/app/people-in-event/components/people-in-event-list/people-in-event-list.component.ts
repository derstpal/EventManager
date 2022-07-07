import { Observable } from 'rxjs';
import { peopleEntity } from './../../../people/models/peopleEntity';
import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-people-in-event-list',
  templateUrl: './people-in-event-list.component.html',
  styleUrls: ['./people-in-event-list.component.scss']
})
export class PeopleInEventListComponent implements OnInit {
@Input() peoples? : Observable<peopleEntity[]>;
  constructor() { }

  ngOnInit(): void {
  }

}
