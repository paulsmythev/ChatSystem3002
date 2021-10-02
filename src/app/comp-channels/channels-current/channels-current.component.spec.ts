import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsCurrentComponent } from './channels-current.component';

describe('ChannelsCurrentComponent', () => {
  let component: ChannelsCurrentComponent;
  let fixture: ComponentFixture<ChannelsCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsCurrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
