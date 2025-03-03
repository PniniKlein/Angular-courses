import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { lesson } from '../../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }
  
    private baseUrl = 'http://localhost:3000/api/courses/';
    public lessons: BehaviorSubject<lesson[]> = new BehaviorSubject<lesson[]>([]);

    
      getLessons(cId:Number){
        this.http.get<lesson[]>(this.baseUrl+cId+"/lessons").subscribe(data=>
               this.lessons.next(data),
               error => alert("failed")
        );
       }
    
      // getCourseById(id: number): course | undefined{
      //   return this.courses.getValue().find(course => course.teacherId === id);
      // }
      
      addLesson(les: lesson){
        this.http.post<any>(this.baseUrl+les.courseId+"/lessons",les).subscribe(data=>
          this.getLessons(les.courseId),
          error => alert("failed")
        );
      }
      updateLesson(id:Number,les: lesson){
        this.http.put<any>(this.baseUrl+les.courseId+"/lessons/"+id,les).subscribe(data=>
          this.getLessons(les.courseId),
          error => alert("failed")
        );
      }
      deleteLesson(cId:Number,id: Number){
        this.http.delete<any>(this.baseUrl+cId+"/lessons/"+id).subscribe(data=>
          this.getLessons(cId),
          error => alert("failed")
        );
      }
}
