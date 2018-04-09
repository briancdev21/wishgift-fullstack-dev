import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceinputComponent } from './priceinput.component';

describe('PriceinputComponent', () => {
  let component: PriceinputComponent;
  let fixture: ComponentFixture<PriceinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
