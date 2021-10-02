import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsCreateComponent } from './channels-create.component';

describe('ChannelsCreateComponent', () => {
  let component: ChannelsCreateComponent;
  let fixture: ComponentFixture<ChannelsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
