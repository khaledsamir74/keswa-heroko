import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent implements OnInit {
  getMsg:string;
  getUser:string;
  getData($event){
    this.getMsg = $event;
    console.log($event);
    this.getUser = $event;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
