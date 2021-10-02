import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsReadComponent } from './channels-read.component';

describe('ChannelsReadComponent', () => {
  let component: ChannelsReadComponent;
  let fixture: ComponentFixture<ChannelsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
