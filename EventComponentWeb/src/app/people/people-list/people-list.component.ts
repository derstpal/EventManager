import { peopleEntity } from './../models/peopleEntity';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PeopleService } from '../people.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent {
  onPeopleList: Observable<peopleEntity[]>;
  @Input() hasSelection: Boolean = false;
  @Input() selectedPeoples?: peopleEntity[];
  @Output() selectedPeoplesChange: EventEmitter<peopleEntity[]> =
    new EventEmitter<peopleEntity[]>();
  constructor(public eventService: PeopleService) {
    this.onPeopleList = this.eventService.OnPeopleList();
  }

  isSelectedChange(peopleEntity: peopleEntity, selected: Boolean) {
    this.selectedPeoples =
      this.selectedPeoples?.filter((e) => e.isSelected === true) ?? [];
    if (selected === true) {
      this.selectedPeoples.push(peopleEntity);
    }
    this.selectedPeoplesChange.emit(this.selectedPeoples);
  }
}
