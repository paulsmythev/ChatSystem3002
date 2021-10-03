import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsReadComponent } from './groups-read.component';

describe('GroupsReadComponent', () => {
  let component: GroupsReadComponent;
  let fixture: ComponentFixture<GroupsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
