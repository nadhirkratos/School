import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: any
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.adminGetAllUsers().subscribe((doc) => {
      this.users = doc.users
    })

  }



  goToviewUser(id: any) {
    this.router.navigate([`/viewUser/${id}`])
  }

  goToEditUser(id: any) {
    this.router.navigate([`/editUser/${id}`])
  }
  deleteUser(id: any) {
    this.userService.adminDeleteUser(id).subscribe((doc) => {
      if (doc) {
        alert(doc.msg)
        // this.router.navigate(["/admin"])
        location.reload()
      }
    })
  }
}
