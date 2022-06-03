import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleInEventListItemComponent } from './people-in-event-list-item.component';

describe('PeopleInEventListItemComponent', () => {
  let component: PeopleInEventListItemComponent;
  let fixture: ComponentFixture<PeopleInEventListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleInEventListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleInEventListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
