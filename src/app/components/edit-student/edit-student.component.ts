import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  editStudentForm!: FormGroup
  user: any


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    let id = this.activatedRoute.snapshot.paramMap.get("id")

    this.editStudentForm = this.formBuilder.group({
      score: ['', [Validators.max(20), Validators.min(0), Validators.required]],
      notes: [''],
      id: [id]
    })

    this.userService.adminGetUser(id).subscribe((doc) => {

      this.user = doc.user
      this.editStudentForm.patchValue(doc.user)

    })

    
  }
  
  editNotes() {
    
    console.log(this.editStudentForm.value);
    this.userService.updateStudentScoreAndNote(this.editStudentForm.value).subscribe((doc) => {
      alert(doc.msg)
    })



  }


}
