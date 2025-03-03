import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { BehaviorSubject } from 'rxjs';
import { course } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class EnrollService{

constructor(private http: HttpClient) { }
  
    private baseUrl = 'http://localhost:3000/api/courses/';
    public coursesToStudent: BehaviorSubject<course[]> = new BehaviorSubject<course[]>([]);

    getCourseByStudent(id:Number){
      this.http.get<course[]>(this.baseUrl+"student/"+id).subscribe(data=>
           {  
            this.coursesToStudent.next(data)
             console.log(data)
           },
           error => alert("failed")
      );
    }

  
    
     
      addRoll(courseId: Number,id:Number){
        console.log(this.coursesToStudent.value)
        this.http.post<any>(this.baseUrl+courseId+"/enroll",{userId:id}).subscribe(data=>
          {this.getCourseByStudent(id)
          alert("You add to the course")},
          error => alert("failed")
        )
      }
      deleteRoll(courseId: Number,id:Number){
        this.http.delete<any>(this.baseUrl+courseId+"/unenroll",{body:{userId:id}}).subscribe(data=>
         { this.getCourseByStudent(id)
          alert("You get outside to the course")},
          error => alert("failed")
        )
      }
  
}
