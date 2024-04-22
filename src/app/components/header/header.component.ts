import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any
  // parentId: any

  constructor(private router: Router
  ) { }

  ngOnInit(): void {
    let token: any = sessionStorage.getItem("token")
    if (token) {
      this.user = jwtDecode(token)
    }




  }

  logout() {
    sessionStorage.removeItem("token")
    location.replace("http://localhost:4200/login")
  }

  

}
