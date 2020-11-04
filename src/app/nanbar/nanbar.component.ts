import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nanbar',
  templateUrl: './nanbar.component.html',
  styleUrls: ['./nanbar.component.css']
})
export class NanbarComponent implements OnInit {
  onOpen(event: any) {
    console.log(event);
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
}
