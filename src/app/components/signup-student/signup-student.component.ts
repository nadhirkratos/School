import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {
  studentForm!: FormGroup
  imagePreview: any
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: "student",
      photo: [''],
    })
  }


  onImageSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
      > 0) {
      const file = inputElement.files[0];
      console.log("here is file", file);
      this.studentForm.patchValue({ photo: file });
      this.studentForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  addStudent() {
    console.log(this.studentForm.valid);
    console.log(this.studentForm.value);
    this.userService.signupStudent(this.studentForm.value, this.studentForm.value.photo).subscribe((doc) => {
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
