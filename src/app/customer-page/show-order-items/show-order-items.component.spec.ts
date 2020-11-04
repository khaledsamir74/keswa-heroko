import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderItemsComponent } from './show-order-items.component';

describe('ShowOrderItemsComponent', () => {
  let component: ShowOrderItemsComponent;
  let fixture: ComponentFixture<ShowOrderItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOrderItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
