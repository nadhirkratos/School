import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  teachers: any
  courseForm!: FormGroup
  imagePreview: any
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private userService: UserService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.userService.adminGetAllUsers().subscribe((doc) => {
      this.teachers = doc.users
      console.log(this.teachers);

    })


    this.courseForm = this.formBuilder.group({
      photo: [''],
      name: [''],
      duration: [''],
      teacher: [''],
      description: [''],
    })
  }


  onImageSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
      > 0) {
      const file = inputElement.files[0];
      this.courseForm.patchValue({ photo: file });
      this.courseForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addCourse() {
    console.log(this.courseForm.value);
    this.courseService.addCourse(this.courseForm.value, this.courseForm.value.photo).subscribe((doc) => {
      alert(doc.msg)
      this.router.navigate(["/admin"])
    })

  }



}
