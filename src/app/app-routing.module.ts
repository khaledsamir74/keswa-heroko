import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component'
import { UsersPageComponent } from './users-page/users-page.component'
import { HomePageComponent } from './home-page/home-page.component';
import { BrandPageComponent } from './brand-page/brand-page.component';
import { CouponPageComponent } from './coupon-page/coupon-page.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { SupplyOrdersComponent } from './supply-orders/supply-orders.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CustomerDataComponent } from './customer-page/customer-data/customer-data.component';
const routes: Routes = [
  { path : "" ,
  component : CustomerDataComponent,
},
{ path : "users" ,
  component : UsersPageComponent,
},
{ path : "Login" ,
  component : LoginPageComponent,
},
{ path : "brands" ,
  component : BrandPageComponent,
},
{ path : "coupons" ,
  component : CouponPageComponent,
},
{ path : "CustomerOrders" ,
  component : CustomerOrdersComponent,
},
{ path : "supplyOrders" ,
  component : SupplyOrdersComponent,
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
