import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatReadComponent } from './chat-read.component';

describe('ChatReadComponent', () => {
  let component: ChatReadComponent;
  let fixture: ComponentFixture<ChatReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
