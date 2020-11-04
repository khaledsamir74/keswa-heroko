import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { UsersPageComponent } from './users-page/users-page.component';
import { UserDataComponent } from './users-page/user-data/user-data.component';
import { ShowUserShippingAdressesComponent } from './users-page/show-user-shipping-adresses/show-user-shipping-adresses.component';
import { ShowUserCouponsComponent } from './users-page/show-user-coupons/show-user-coupons.component';
import { EditUserShippingAdressComponent } from './users-page/edit-user-shipping-adress/edit-user-shipping-adress.component';
import { EditUserCouponComponent } from './users-page/edit-user-coupon/edit-user-coupon.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrandPageComponent } from './brand-page/brand-page.component';
import { BrandsComponent } from './brand-page/brands/brands.component';
import { BrandDataComponent } from './brand-page/brand-data/brand-data.component';
import { CouponPageComponent } from './coupon-page/coupon-page.component';
import { CouponsComponent } from './coupon-page/coupons/coupons.component';
import { CouponDataComponent } from './coupon-page/coupon-data/coupon-data.component';
import { NanbarComponent } from './nanbar/nanbar.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { SupplyOrdersComponent } from './supply-orders/supply-orders.component';
import { SupplyOrdersTableComponent } from './supply-orders/supply-orders-table/supply-orders-table.component';
import { OrderDataComponent } from './supply-orders/order-data/order-data.component';
import { OrderItemsComponent } from './supply-orders/order-items/order-items.component';
import { OrderTotalComponent } from './supply-orders/order-total/order-total.component';
import { OrderStatusComponent } from './supply-orders/order-status/order-status.component';
import { OrderItemDataComponent } from './supply-orders/order-item-data/order-item-data.component';
import { ItemCostComponent } from './supply-orders/item-cost/item-cost.component';
import { ItemStatusComponent } from './supply-orders/item-status/item-status.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { CustomerDataComponent } from './customer-page/customer-data/customer-data.component';
import { ShowOrderItemsComponent } from './customer-page/show-order-items/show-order-items.component';
import { OrderCostComponent } from './customer-page/order-cost/order-cost.component';
import { EditOrderItemComponent } from './customer-page/edit-order-item/edit-order-item.component';
import { ItemTotalComponent } from './customer-page/item-total/item-total.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersPageComponent,
    UserDataComponent,
    ShowUserShippingAdressesComponent,
    ShowUserCouponsComponent,
    EditUserShippingAdressComponent,
    EditUserCouponComponent,
    HomePageComponent,
    BrandPageComponent,
    BrandsComponent,
    BrandDataComponent,
    CouponPageComponent,
    CouponsComponent,
    CouponDataComponent,
    NanbarComponent,
    CustomerOrdersComponent,
    SupplyOrdersComponent,
    SupplyOrdersTableComponent,
    OrderDataComponent,
    OrderItemsComponent,
    OrderTotalComponent,
    OrderStatusComponent,
    OrderItemDataComponent,
    ItemCostComponent,
    ItemStatusComponent,
    LoginPageComponent,
    CustomerPageComponent,
    CustomerDataComponent,
    ShowOrderItemsComponent,
    OrderCostComponent,
    EditOrderItemComponent,
    ItemTotalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  exports:[

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
