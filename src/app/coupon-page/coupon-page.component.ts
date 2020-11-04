import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon-page',
  templateUrl: './coupon-page.component.html',
  styleUrls: ['./coupon-page.component.css']
})
export class CouponPageComponent implements OnInit {
  getMsg: string;
  getUser: string;
  getData($event) {
    this.getMsg = $event;
    console.log($event);
    this.getUser = $event;
  }
  constructor() {

  }

  ngOnInit(): void {
    console.log(this.getMsg);
  }

}
