import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsAssignedComponent } from './groups-assigned.component';

describe('GroupsAssignedComponent', () => {
  let component: GroupsAssignedComponent;
  let fixture: ComponentFixture<GroupsAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsAssignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
