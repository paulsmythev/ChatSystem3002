import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsCurrentComponent } from './groups-current.component';

describe('GroupsCurrentComponent', () => {
  let component: GroupsCurrentComponent;
  let fixture: ComponentFixture<GroupsCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsCurrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
