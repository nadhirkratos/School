import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////   these services are for signing up based on the role  //////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  signupStudent(student: any, photo: File) {
    let fData = new FormData()
    fData.append("photo", photo)
    fData.append("firstName", student.firstName)
    fData.append("lastName", student.lastName)
    fData.append("email", student.email)
    fData.append("phoneNumber", student.phoneNumber)
    fData.append("address", student.address)
    fData.append("password", student.password)
    fData.append("role", student.role)

    return this.httpClient.post<{ registred: boolean, msg: string }>("http://localhost:3000/students", fData)
  }

  signupTeacher(teacher: any, photo: File, cv: File) {
    let fData = new FormData()
    fData.append("cv", cv)
    fData.append("photo", photo)
    fData.append("firstName", teacher.firstName)
    fData.append("lastName", teacher.lastName)
    fData.append("email", teacher.email)
    fData.append("phoneNumber", teacher.phoneNumber)
    fData.append("address", teacher.address)
    fData.append("password", teacher.password)
    fData.append("role", teacher.role)
    fData.append("speciality", teacher.speciality)

    return this.httpClient.post<{ registred: boolean, msg: string }>("http://localhost:3000/teachers", fData)
  }

  signupParent(parent: any, photo: File) {
    let fData = new FormData()
    fData.append("photo", photo)
    fData.append("firstName", parent.firstName)
    fData.append("lastName", parent.lastName)
    fData.append("email", parent.email)
    fData.append("phoneNumber", parent.phoneNumber)
    fData.append("address", parent.address)
    fData.append("password", parent.password)
    fData.append("role", parent.role)
    fData.append("phoneNumberOfChild", parent.phoneNumberOfChild)


    return this.httpClient.post<{ registred: boolean, msg: string }>("http://localhost:3000/parents", fData)
  }












  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////   this is to log in  ///////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  login(user: any) {
    return this.httpClient.post<{ msg: string, token: any }>("http://localhost:3000/login", user)
  }







  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////   admin control users  /////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  adminGetAllUsers() {
    return this.httpClient.get<{ msg: string, users: any }>("http://localhost:3000/users")
  }

  adminGetUser(id: any) {
    return this.httpClient.get<{ msg: string, user: any }>(`http://localhost:3000/user/${id}`)
  }

  adminEditUser(user: any) {
    return this.httpClient.post<{ msg: string, updatedUser: any }>("http://localhost:3000/user", user)
  }

  adminDeleteUser(id: any) {
    return this.httpClient.delete<{ msg: string }>(`http://localhost:3000/user/${id}`)
  }




  getAllTeachers() {
    return this.httpClient.get<{ teachers: any }>("http://localhost:3000/teachers")
  }

  teacherGetsAllHisStudents(connectedUserId: any) {
    return this.httpClient.post<{ students: any }>("http://localhost:3000/studentsOfTeacher", connectedUserId)
  }

  updateStudentScoreAndNote(scoreAndNote: any) {
    return this.httpClient.post<{ msg: string }>("http://localhost:3000/updateScoreAndNote", scoreAndNote)
  }

  searchTeacherByNameOrSpeciality(searchValue: any) {
    return this.httpClient.post<{ teachers: any, founded: boolean, msg: string }>("http://localhost:3000/teacher", searchValue)
  }

  getStudentByNumber(phoneNumberOfStudent: any) {
    return this.httpClient.post<{ student: any, founded: boolean, msg: string }>("http://localhost:3000/findStudent", phoneNumberOfStudent)
  }














}






