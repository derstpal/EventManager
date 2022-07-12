import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCreateComponent } from './invite-create.component';

describe('InviteCreateComponent', () => {
  let component: InviteCreateComponent;
  let fixture: ComponentFixture<InviteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
