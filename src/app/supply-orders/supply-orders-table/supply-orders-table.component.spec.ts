import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyOrdersTableComponent } from './supply-orders-table.component';

describe('SupplyOrdersTableComponent', () => {
  let component: SupplyOrdersTableComponent;
  let fixture: ComponentFixture<SupplyOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyOrdersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
