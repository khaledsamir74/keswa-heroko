import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { StringifyOptions } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  getUser: string;
  getSaveUserData: string;
  getShipping: string;
  getCoupon: string;
  parentMsg: string;
  parentShipping: string;
  parentCoupon: string;
  totalMsg: string = "";
  usersSection: boolean = true;
  sections: boolean[] = [false, false, false, false, false];//data,showShipping,showCoupon,editShipping,editCoupon
  getData($event) {
    this.getUser = $event;
    this.getUser.split('');
    this.sections = [false, false, false, false, false];
    if (this.getUser[0] == 'a' && this.getUser[1] == 'd') {//add
      this.parentMsg = "";
      this.sections[0] = true;
      this.usersSection = false;
    }
    if (this.getUser[0] == 'e') {//edit
      for (var i = 5; i < this.getUser.length; i++) {
        this.totalMsg = this.totalMsg + this.getUser[i];
      }
      this.parentMsg = this.totalMsg;
      this.totalMsg = "";
      this.sections[0] = this.sections[1] = this.sections[2] = true;
      this.usersSection = false;

    }
  }
  getBack($event) {
    this.getSaveUserData = $event;
    this.getSaveUserData.split('');
    if (this.getSaveUserData[0] == "s") {
      for (var i = 4; i < this.getSaveUserData.length; i++) {
        this.totalMsg = this.totalMsg + this.getSaveUserData[i];
      }
      this.parentMsg = this.totalMsg;
      this.totalMsg = "";
      this.usersSection = false;
      this.sections = [true, true, true, false, false];
    }
    else if (this.getSaveUserData[0] == "b") {
      this.usersSection = true;
      this.sections = [false, false, false, false, false];
    }

  }

  getShippingData($event) {
    this.getShipping = $event;
    this.usersSection = false;
    this.sections = [false, false, false, true, false];
    this.parentShipping = this.getShipping;
  }
  getCouponData($event) {
    this.getCoupon = $event;
    this.usersSection = false;
    this.sections = [false, false, false, false, true];
    this.parentCoupon = this.getCoupon;

  }
  getshippingBack($event) {
      this.usersSection = false;
      this.sections = [true, true, true, false, false];
  }
  getCouponBack($event) {
    if ($event == "save") {
      this.usersSection = false;
      this.sections = [true, true, true, false, false];
    }
    else if ($event == "back") {
      this.usersSection = false;
      this.sections = [true, true, true, false, false]
    }
  }

  constructor(private  router: Router) {

  }

  ngOnInit(): void {
    if(localStorage.getItem("loggedInUser")==null){
      this.router.navigate(['/Login']);
    }

  }

}
