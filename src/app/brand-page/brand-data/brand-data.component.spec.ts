import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDataComponent } from './brand-data.component';

describe('BrandDataComponent', () => {
  let component: BrandDataComponent;
  let fixture: ComponentFixture<BrandDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
