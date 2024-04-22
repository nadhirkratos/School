import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {
  teacherForm!: FormGroup
  imagePreview: any

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: "teacher",
      speciality: ['', [Validators.required]],
      photo: [''],
      cv: [''],
    })
  }

  onImageSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
      > 0) {
      const file = inputElement.files[0];
      this.teacherForm.patchValue({ photo: file });
      this.teacherForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  onCvSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
      > 0) {
      const file = inputElement.files[0];
      this.teacherForm.patchValue({ cv: file });
      this.teacherForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
      };
      reader.readAsDataURL(file);
    }
  }



  addTeacher() {
    console.log(this.teacherForm.valid);
    console.log(this.teacherForm.value);

    this.userService.signupTeacher(this.teacherForm.value, this.teacherForm.value.photo, this.teacherForm.value.cv).subscribe((doc) => {
      console.log(doc.msg, ", user is registred :" + doc.registred);
      if (doc.registred == true) {
        alert("congratulations now you hava an account , you can go ahead and log in now")
        this.router.navigate(["/login"])
      }
      else if (!doc.registred) {
        alert("that mail is already in use...")
      }
    })


  }

}
