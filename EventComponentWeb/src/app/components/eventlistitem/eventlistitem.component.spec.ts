import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventlistitemComponent } from './eventlistitem.component';

describe('EventlistitemComponent', () => {
  let component: EventlistitemComponent;
  let fixture: ComponentFixture<EventlistitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventlistitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventlistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
