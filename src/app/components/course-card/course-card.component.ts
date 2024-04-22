import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() courseCard: any
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  viewCourse(id: any) {
    console.log(this.courseCard._id);
    this.router.navigate([`/viewCourse/${id}`])
  }

}
