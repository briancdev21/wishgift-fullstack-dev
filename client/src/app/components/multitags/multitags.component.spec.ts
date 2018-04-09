import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultitagsComponent } from './multitags.component';

describe('MultitagsComponent', () => {
  let component: MultitagsComponent;
  let fixture: ComponentFixture<MultitagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultitagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultitagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
