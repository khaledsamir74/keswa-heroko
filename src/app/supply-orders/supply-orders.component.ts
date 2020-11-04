import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supply-orders',
  templateUrl: './supply-orders.component.html',
  styleUrls: ['./supply-orders.component.css']
})
export class SupplyOrdersComponent implements OnInit {
  getMsg:string;
  getUser:string;
  getData($event){
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