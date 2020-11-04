import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserShippingAdressesComponent } from './show-user-shipping-adresses.component';

describe('ShowUserShippingAdressesComponent', () => {
  let component: ShowUserShippingAdressesComponent;
  let fixture: ComponentFixture<ShowUserShippingAdressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserShippingAdressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserShippingAdressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
