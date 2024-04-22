import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { InstructorCardComponent } from './components/instructor-card/instructor-card.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { SearchComponent } from './components/search/search.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { CheckMyChildComponent } from './components/check-my-child/check-my-child.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HeroComponent,
    InstructorsComponent,
    InstructorCardComponent,
    CoursesComponent,
    CourseCardComponent,
    LoginComponent,
    SignupComponent,
    SignupStudentComponent,
    SignupTeacherComponent,
    SignupParentComponent,
    AdminComponent,
    CoursesTableComponent,
    UsersTableComponent,
    ViewUserComponent,
    EditUserComponent,
    AddCourseComponent,
    ViewCourseComponent,
    EditCourseComponent,
    SearchComponent,
    ViewStudentsComponent,
    StudentsTableComponent,
    EditStudentComponent,
    CheckMyChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
