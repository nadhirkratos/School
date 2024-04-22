import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  teachers: any
  searchForm!: FormGroup
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [""],
    })
  }

  search() {
    // console.log(this.searchForm.value);

      this.userService.searchTeacherByNameOrSpeciality(this.searchForm.value).subscribe((doc) => {
        if (doc.founded == true) {
          this.teachers = doc.teachers
          console.log(doc.teachers);
          console.log( doc.msg, doc.founded);
          // alert(doc.msg)

        } else if (doc.founded == false) {
          alert(doc.msg)
        }
      })
  }

}
