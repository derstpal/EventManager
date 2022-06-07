import { query } from 'firebase/database';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @ViewChild('closebutton') closeButton: ElementRef | undefined;

  constructor(private elem: ElementRef<Element>) {}

  ngOnInit(): void {}

  public onSubRootDeactivate() {
    this.closeButton?.nativeElement.click();
  }

  public onSubRootActivate() {
    let bodyPanel = this.elem.nativeElement.querySelector('.modal-body');
    if (bodyPanel === null) {
      return;
    }
    let buttonsPanel = bodyPanel.querySelectorAll(
      'div.em-button-container > button'
    );
    if (buttonsPanel !== null) {
      let destination = this.elem.nativeElement.querySelector('.em-footer-pl');
      buttonsPanel.forEach((e, k, p) => destination?.appendChild(e));
    }
    let headerPanel = bodyPanel.querySelector('.em-header');
    if (headerPanel !== null) {
      let destination = this.elem.nativeElement.querySelector('.em-header-pl');
      if (destination !== null) {
        destination.innerHTML = headerPanel.innerHTML;
        headerPanel.innerHTML = '';
      }
    }
    //buttonsPanel.remove();
  }
}
