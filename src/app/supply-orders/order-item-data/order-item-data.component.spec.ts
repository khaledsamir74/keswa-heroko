import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemDataComponent } from './order-item-data.component';

describe('OrderItemDataComponent', () => {
  let component: OrderItemDataComponent;
  let fixture: ComponentFixture<OrderItemDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
