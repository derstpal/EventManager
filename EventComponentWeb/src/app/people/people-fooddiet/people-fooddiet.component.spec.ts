import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleFoodComponent } from './people-fooddiet.component';

describe('PeopleFoodComponent', () => {
  let component: PeopleFoodComponent;
  let fixture: ComponentFixture<PeopleFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
