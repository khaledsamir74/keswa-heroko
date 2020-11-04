import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCostComponent } from './item-cost.component';

describe('ItemCostComponent', () => {
  let component: ItemCostComponent;
  let fixture: ComponentFixture<ItemCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
