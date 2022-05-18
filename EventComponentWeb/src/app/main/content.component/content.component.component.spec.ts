import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content.ComponentComponent } from './content.component.component';

describe('Content.ComponentComponent', () => {
  let component: Content.ComponentComponent;
  let fixture: ComponentFixture<Content.ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Content.ComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
