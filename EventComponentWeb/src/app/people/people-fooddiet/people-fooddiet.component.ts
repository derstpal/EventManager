import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Diet } from '../models/diet.enum';

@Component({
  selector: 'app-people-fooddiet',
  templateUrl: './people-fooddiet.component.html',
  styleUrls: ['./people-fooddiet.component.scss'],
})
export class PeopleFoodComponent implements OnInit {
  FoodDietEnum = Diet;
  @Input('foodDiet') diet?: Diet;
  @Output('foodDietChange') dietChange = new EventEmitter<Diet>();

  constructor() {}

  ngOnInit(): void {}

  selectDiet(value: Diet) {
    console.log(`select diet ${Diet[value]}`);
    this.dietChange.emit(value);
    this.diet = value;
  }
}
