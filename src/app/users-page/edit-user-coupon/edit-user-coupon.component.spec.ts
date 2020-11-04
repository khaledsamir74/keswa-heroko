import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserCouponComponent } from './edit-user-coupon.component';

describe('EditUserCouponComponent', () => {
  let component: EditUserCouponComponent;
  let fixture: ComponentFixture<EditUserCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
