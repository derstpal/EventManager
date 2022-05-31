import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  @ViewChild('closebutton') closeButton: ElementRef | undefined;

  constructor() {}

  ngOnInit(): void {}

  public onSubRootDeactivate() {
    this.closeButton?.nativeElement.click();
  }
}
