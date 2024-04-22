import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { SearchComponent } from './components/search/search.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { CheckMyChildComponent } from './components/check-my-child/check-my-child.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "admin", component: AdminComponent },
  { path: "addCourse", component: AddCourseComponent },
  { path: "search", component: SearchComponent },
  { path: "viewstudents", component: ViewStudentsComponent },
  { path: "viewUser/:id", component: ViewUserComponent },
  { path: "viewCourse/:id", component: ViewCourseComponent },
  { path: "editUser/:id", component: EditUserComponent },
  { path: "editCourse/:id", component: EditCourseComponent },
  { path: "editStudent/:id", component: EditStudentComponent },
  { path: "checkmychild", component: CheckMyChildComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
