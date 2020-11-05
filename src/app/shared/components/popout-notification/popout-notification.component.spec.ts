import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoutNotificationComponent } from './popout-notification.component';

describe('PopoutNotificationComponent', () => {
  let component: PopoutNotificationComponent;
  let fixture: ComponentFixture<PopoutNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoutNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoutNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
