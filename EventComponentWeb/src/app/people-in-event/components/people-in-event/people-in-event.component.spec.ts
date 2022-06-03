import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleInEventComponent } from './people-in-event.component';

describe('PeopleInEventComponent', () => {
  let component: PeopleInEventComponent;
  let fixture: ComponentFixture<PeopleInEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleInEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleInEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
