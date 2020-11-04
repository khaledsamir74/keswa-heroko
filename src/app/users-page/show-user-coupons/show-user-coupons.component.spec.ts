import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserCouponsComponent } from './show-user-coupons.component';

describe('ShowUserCouponsComponent', () => {
  let component: ShowUserCouponsComponent;
  let fixture: ComponentFixture<ShowUserCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserCouponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
