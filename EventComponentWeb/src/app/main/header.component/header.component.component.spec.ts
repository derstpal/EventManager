import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header.ComponentComponent } from './header.component.component';

describe('Header.ComponentComponent', () => {
  let component: Header.ComponentComponent;
  let fixture: ComponentFixture<Header.ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Header.ComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Header.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
