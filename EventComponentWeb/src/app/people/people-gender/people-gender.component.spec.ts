import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleGenderComponent } from './people-gender.component';

describe('PoepleGenderComponent', () => {
  let component: PeopleGenderComponent;
  let fixture: ComponentFixture<PeopleGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
