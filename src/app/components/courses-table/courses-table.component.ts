import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  courses: any
  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((doc) => {
      this.courses = doc.courses


    })

  }

  viewCours(id: any) {
    this.router.navigate([`viewCourse/${id}`])
  }

  editCours(id: any) {
    this.router.navigate([`editCourse/${id}`])
  }

  deleteCourse(id: any) {
    this.courseService.deleteCourse(id).subscribe((doc) => {
      if (doc.deleted == true) {
        alert(doc.msg)
        location.reload()
      }
      else {
        alert(doc.msg)
      }
    })
  }


}
