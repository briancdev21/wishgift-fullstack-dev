import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusDropdownComponent } from './cus-dropdown.component';

describe('CusDropdownComponent', () => {
  let component: CusDropdownComponent;
  let fixture: ComponentFixture<CusDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
