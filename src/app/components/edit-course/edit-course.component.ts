import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseForm!: FormGroup
  course: any
  teachers: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit(): void {

    let id: any = this.activatedRoute.snapshot.paramMap.get("id")

    this.courseService.viewCourse(id).subscribe((doc) => {
      doc.course.teacher = doc.course.teacher._id
      this.course = doc.course
      this.courseForm.patchValue(doc.course)


    })

    this.userService.getAllTeachers().subscribe((doc) => {
      this.teachers = doc.teachers
      console.log("teachers are here : ", this.teachers);
    })


    this.courseForm = this.formBuilder.group({
      name: [''],
      description: [''],
      duration: [''],
      teacher: [''],
      id: [id],
    })

  }


  updateCourse() {
    console.log(this.courseForm.value);

    this.courseService.editCourse(this.courseForm.value).subscribe((doc) => {
      alert(doc.msg)
      if (doc) {
        this.router.navigate(["/admin"])
      } else {

      }
    })

  }





}
