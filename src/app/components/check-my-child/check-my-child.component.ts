import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-check-my-child',
  templateUrl: './check-my-child.component.html',
  styleUrls: ['./check-my-child.component.css']
})
export class CheckMyChildComponent implements OnInit {

  parent: any;
  user: any

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    let token: any = sessionStorage.getItem("token");

    this.parent = jwtDecode(token);
    let phoneNumberOfChild: any = this.parent.phoneNumberOfChild
    console.log(this.parent);

    let obj: any = { phoneNumberOfChild: phoneNumberOfChild };
    console.log(obj);




    this.userService.getStudentByNumber(obj).subscribe((doc) => {
      this.user = doc.student
      console.log(this.user);
    })




  }




}
