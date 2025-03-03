import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../service/courses/courses.service';
import { course } from '../../models/course';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { UserService } from '../../service/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IconPipe } from '../../pipe/icon.pipe';
import { TooltipDirective } from '../../directive/tooltip.directive';
import { EnrollService } from '../../service/enroll/enroll.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseDetailsComponent,MatListModule,MatIconModule,MatButtonModule,
    MatDialogModule,MatInputModule,MatFormFieldModule,MatCardModule,
    MatGridListModule,IconPipe,TooltipDirective

  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  
  courseToChange:course;
  addFlag= false;
  editFlag= false;

  constructor(private courseService: CoursesService,private userService: UserService,private router: Router,
     private route: ActivatedRoute,private enrollService:EnrollService) { }
  courses$ = this.courseService.courses;
  user$ = this.userService.user;
  courseStudent$ = this.enrollService.coursesToStudent

  courseExist(id:Number){
    return this.courseStudent$.value.some(c => c.id === id)
   }
  viewLessons(courseId: Number) {
    this.route.url.subscribe(urlSegments => {
      const currentUrl = this.router.url; 
      const newUrl = `${currentUrl}/${courseId}`; 
      this.router.navigateByUrl(newUrl); 
    });
  }
  ngOnInit() {
    this.courseService.getCourses();
    this.courses$ = this.courseService.courses;
    this.enrollService.getCourseByStudent(this.userService.user.value.id);
  }

  addCourse(cours: course) {
    if(cours!=null)
      this.courseService.addCourse(cours);
    this.addFlag=false;
  }

  updateCourse(cours: course) {
    if(cours!=null)
     this.courseService.updateCourse(cours.id, cours);
    this.editFlag=false;
  }

  deleteCourse(id: Number) {
    this.courseService.deleteCourse(id);
  }

  add(){
    this.addFlag=true
    this.courseToChange=new course(0,'','',this.userService.user.value.id)
  }

  edit(course: course) {
     this.editFlag=true;
     this.courseToChange=course;
  }

  login(id: Number){
    console.log(this.courseStudent$.value)
     this.enrollService.addRoll(id,this.userService.user.value.id);
  }

  logout(id: Number){
    this.enrollService.deleteRoll(id,this.userService.user.value.id);
  }
}
