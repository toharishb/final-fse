import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersViewComponent } from './reminders-view.component';

describe('RemindersViewComponent', () => {
  let component: RemindersViewComponent;
  let fixture: ComponentFixture<RemindersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
