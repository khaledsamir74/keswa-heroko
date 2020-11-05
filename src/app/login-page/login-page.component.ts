import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
  export class LoginPageComponent implements OnInit {
    @ViewChild('Email') email;
    @ViewChild('Password') pass;

  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient, private router:Router) { 
    }

  ngOnInit(): void {
  }
  login = () => {
    let done : boolean = false;
    var requestLogin = {
      requestUserId: '1',
      requestData: {
        "userId": this.email.nativeElement.value,
        "userPass": this.pass.nativeElement.value
      }
    };
    this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postLoginUser", requestLogin)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          console.log(obj);
          
        if (obj.responseCode == "200") {
          localStorage.setItem('loggedInUser',JSON.stringify(obj.responseData));
          this.router.navigate(['']);
          done = true;
        }
        else {
          alert("Wrong ID or PW");
          done = false;
        }
      })
  }
}
