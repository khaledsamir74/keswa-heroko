import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.css']
})
export class BrandPageComponent implements OnInit {
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
