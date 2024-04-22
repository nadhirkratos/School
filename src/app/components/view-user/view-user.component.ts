import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  user: any
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    let id: any = this.activatedRoute.snapshot.paramMap.get("id")
    console.log(id);

    this.userService.adminGetUser(id).subscribe((doc) => {
      this.user = doc.user
      console.log(this.user);

    })
  }

}
