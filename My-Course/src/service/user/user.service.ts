import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { EnrollService } from '../enroll/enroll.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

    private baseUrl ='http://localhost:3000/api/users/';
    public user: BehaviorSubject<user> = new BehaviorSubject<user>(new user(0,'','','',''));
    constructor(private http: HttpClient,private enrollService: EnrollService ){}

  getById(id:Number){
    this.http.get<user>(this.baseUrl+id).subscribe(data=>
     { this.user.next(data as user)
      console.log(this.user.value)
      this.enrollService.getCourseByStudent(this.user.value.id)
     },
    );   
  }

  getUserFromToken() {
      const token = sessionStorage.getItem('authToken')
      if (token)
      try {
        const decodedToken: any = jwtDecode(token)
        console.log(decodedToken)
        this.getById(decodedToken.userId)
        console.log(this.user.value)
      }
      catch (error) {
        console.error('שגיאה בפענוח ה-Token:', error)
      }
    }

    ngOnInit() {
      this.getUserFromToken()
    }
}
