import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundswitchComponent } from './roundswitch.component';

describe('RoundswitchComponent', () => {
  let component: RoundswitchComponent;
  let fixture: ComponentFixture<RoundswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundswitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
