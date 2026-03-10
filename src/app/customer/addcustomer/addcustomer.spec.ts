import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addcustomer } from './addcustomer';

describe('Addcustomer', () => {
  let component: Addcustomer;
  let fixture: ComponentFixture<Addcustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addcustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addcustomer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
