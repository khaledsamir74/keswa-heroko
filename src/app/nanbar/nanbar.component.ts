import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nanbar',
  templateUrl: './nanbar.component.html',
  styleUrls: ['./nanbar.component.css']
})
export class NanbarComponent implements OnInit {
  login : string;
  subscription : Subscription;
  onOpen(event: any) {
    console.log(event);
  }
  constructor(private router: Router) { }
  ngOnInit(): void {
      this.subscription= this.router.events.subscribe(
        (event) => {
          if (event instanceof NavigationStart){
            if(localStorage.getItem("loggedInUser")==null){
              this.login="Login";
              }
            else{
              this.login="Logout";
            }
          }
        }
      )
  }
  onLogout(){
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
}
