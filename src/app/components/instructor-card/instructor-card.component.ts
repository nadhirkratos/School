import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-card',
  templateUrl: './instructor-card.component.html',
  styleUrls: ['./instructor-card.component.css']
})
export class InstructorCardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input() instructor: any

  viewTeacher(id: any) {
    console.log(this.instructor._id);
    this.router.navigate([`/viewUser/${id}`])


  }

  ngOnInit(): void {
  }

}
