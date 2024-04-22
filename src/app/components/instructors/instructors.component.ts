import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  instructors: any

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.adminGetAllUsers().subscribe((doc) => {
      this.instructors = doc.users
      console.log(this.instructors);

    })
  }

}
