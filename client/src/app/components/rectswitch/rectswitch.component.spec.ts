import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectswitchComponent } from './rectswitch.component';

describe('RectswitchComponent', () => {
  let component: RectswitchComponent;
  let fixture: ComponentFixture<RectswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectswitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
