import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @ViewChild('closebutton') closeButton: ElementRef | undefined;

  constructor() {}

  ngOnInit(): void {}

  public onSubRootDeactivate() {
    this.closeButton?.nativeElement.click();
  }
}
