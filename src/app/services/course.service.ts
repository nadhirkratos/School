import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  addCourse(course: any, photo: File) {
    let fData = new FormData()
    fData.append("photo", photo)
    fData.append("name", course.name)
    fData.append("duration", course.duration)
    fData.append("teacher", course.teacher)
    fData.append("description", course.description)

    return this.httpClient.post<{ msg: string }>("http://localhost:3000/course", fData)
  }

  getAllCourses() {
    return this.httpClient.get<{ courses: any }>("http://localhost:3000/courses")
  }

  viewCourse(id: any) {
    return this.httpClient.get<{ course: any }>(`http://localhost:3000/course/${id}`)
  }

  editCourse(editedCourse: any) {
    return this.httpClient.post<{ msg: string, course: any }>("http://localhost:3000/editCourse", editedCourse)
  }
  deleteCourse(id: any) {
    return this.httpClient.delete<{ deleted: boolean, msg: string }>(`http://localhost:3000/course/${id}`)
  }

}
