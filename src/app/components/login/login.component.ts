import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phoneNumber: [''],
      password: [''],
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe((doc) => {
      if (!doc.token) {
        alert("your phone number or you password or both are wrong")
      } else {
        sessionStorage.setItem("token", doc.token)
        alert("welcome, it's good to see you !")
        location.replace("http://localhost:4200/")

      }
    })
  }

}
