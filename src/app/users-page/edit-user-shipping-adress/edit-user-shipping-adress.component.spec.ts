import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserShippingAdressComponent } from './edit-user-shipping-adress.component';

describe('EditUserShippingAdressComponent', () => {
  let component: EditUserShippingAdressComponent;
  let fixture: ComponentFixture<EditUserShippingAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserShippingAdressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserShippingAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
