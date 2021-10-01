import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCurrentComponent } from './users-current.component';

describe('UsersCurrentComponent', () => {
  let component: UsersCurrentComponent;
  let fixture: ComponentFixture<UsersCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCurrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
