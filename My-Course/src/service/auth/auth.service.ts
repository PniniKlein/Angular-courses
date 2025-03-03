import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl ='http://localhost:3000/api/auth';
  constructor(private http: HttpClient,private userService:UserService){}

  signUp(user:user){
    
    this.http.post<any>(this.baseUrl+'/register',user).subscribe(
    (data)=>{
      debugger
      this.signIn(user);
    },
    (error) => {
      console.error('Registration failed', error);
    } 
  );
  }

  signIn(user:user){
    this.http.post<any>(this.baseUrl+'/login',user).subscribe(data=>
      {
        if (data.token) {
          sessionStorage.setItem('authToken', data.token);
          console.log(data.token);
          this.userService.getById(data.userId); 
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
