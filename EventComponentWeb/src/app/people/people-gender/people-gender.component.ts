import { Gender } from './../models/gender.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-people-gender',
  templateUrl: './people-gender.component.html',
  styleUrls: ['./people-gender.component.scss']
})
export class PeopleGenderComponent implements OnInit {
  GenderEnum = Gender;
  @Input("gender") gender? : Gender;
  @Output("genderChange") genderChange = new EventEmitter<Gender>();

  constructor() { }

  ngOnInit(): void {
  }

  selectGender(value : Gender) {
    console.log(`select gender ${Gender[value]}`);
    this.genderChange.emit(value);
    this.gender = value;
  }

}
