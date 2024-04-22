import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  students: any
  // connectedUserId: any
  // connectedUser: any

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    let token: any = sessionStorage.getItem("token")
    if (token) {
      let connectedUser: any = jwtDecode(token)

      let connectedUserId = connectedUser.id

      this.userService.teacherGetsAllHisStudents({ connectedUserId }).subscribe((doc) => {
        this.students = doc.students
      })





    }


  }


  goToEditStudent(id: any) {
    this.router.navigate([`/editStudent/${id}`])
  }



}
