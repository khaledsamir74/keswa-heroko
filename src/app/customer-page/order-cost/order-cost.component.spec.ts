import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCostComponent } from './order-cost.component';

describe('OrderCostComponent', () => {
  let component: OrderCostComponent;
  let fixture: ComponentFixture<OrderCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
