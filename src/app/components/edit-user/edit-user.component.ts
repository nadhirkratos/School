import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any
  courses: any
  userForm!: FormGroup

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  ngOnInit(): void {

    let id: any = this.activatedRoute.snapshot.paramMap.get("id")
    // console.log(id);

    this.userService.adminGetUser(id).subscribe((doc) => {
      ////////////////////// this is added by nidhal specefically here ///////////////
      // doc.user.isEnrolledIn = doc.user.isEnrolledIn[0]._id
      ////////////////////////////////////////////////////////////////////////////////


      this.userForm.patchValue(doc.user)
      this.user = doc.user
      // console.log("this is the userForm : ", this.userForm.value);
    })

    this.courseService.getAllCourses().subscribe((doc) => {
      this.courses = doc.courses
      // console.log("these are the courses : ", this.courses);
    })


    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      address: [''],
      role: [''],
      id: [id],
      isEnrolledIn: ['']
    })

  }

  

  editUser() {

    console.log(this.userForm.value);
    this.userService.adminEditUser(this.userForm.value).subscribe((doc) => {
      if (doc) {
        console.log(doc.msg);
        this.router.navigate(["/admin"])
      }
    })




  }

}
