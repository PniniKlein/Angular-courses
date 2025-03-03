import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { course } from '../../models/course';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) { }
  
  private baseUrl = 'http://localhost:3000/api/courses/';

  public courses: BehaviorSubject<course[]> = new BehaviorSubject<course[]>([]);
  getCourses(){
    this.http.get<course[]>(this.baseUrl).subscribe(data=>
           this.courses.next(data),
           error => alert("failed")
    );
   }

  // getCourseById(id: number): course | undefined{
  //   return this.courses.getValue().find(course => course.teacherId === id);
  // }
  
  addCourse(cours: course){
    this.http.post<any>(this.baseUrl,cours).subscribe(data=>
      this.getCourses(),
      error => alert("failed")
    );
  }
  updateCourse(id:Number,cours: course){
    this.http.put<any>(this.baseUrl+id,cours).subscribe(data=>
      this.getCourses(),
      error => alert("failed")
    );
  }
  deleteCourse(id: Number){
    this.http.delete<any>(this.baseUrl+id).subscribe(data=>
      this.getCourses(),
      error => alert("failed")
    );
  }
}
