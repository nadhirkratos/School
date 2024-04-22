import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: any
  token: any

  constructor() { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem("token")
    
    this.user = jwtDecode(this.token)
    console.log(this.user);

    if (!this.user || this.user.role != "admin") {
      location.replace("http://localhost:4200/")
    }
  }

}
