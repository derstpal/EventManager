import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleInEventListComponent } from './people-in-event-list.component';

describe('PeopleInEventListComponent', () => {
  let component: PeopleInEventListComponent;
  let fixture: ComponentFixture<PeopleInEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleInEventListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleInEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
