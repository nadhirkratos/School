import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  course: any
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    let id: any = this.activatedRoute.snapshot.paramMap.get("id")
    console.log(id);

    this.courseService.viewCourse(id).subscribe((doc) => {
      this.course = doc.course
    })

  }

}
