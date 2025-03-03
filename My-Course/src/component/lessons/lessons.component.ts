import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../service/lesson/lesson.service';;

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { lesson } from '../../models/lesson';
import { LessonDetailsComponent } from '../lesson-details/lesson-details.component';
import { UserService } from '../../service/user/user.service';
import { IconPipe } from '../../pipe/icon.pipe';
import { TooltipDirective } from '../../directive/tooltip.directive';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [MatListModule,MatIconModule,MatButtonModule,MatDialogModule,MatInputModule,MatFormFieldModule,MatCardModule
    ,MatGridListModule,LessonDetailsComponent,IconPipe,TooltipDirective
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  courseId: Number;
  lessonToChange:lesson;
  addFlag= false;
  editFlag= false;
  constructor(private activatedRoute: ActivatedRoute,private lessonService:LessonService,private userService: UserService) { }
  lessons$ = this.lessonService.lessons;
  user$ = this.userService.user;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
    this.courseId=params.get('id')?Number(params.get('id')):0;
    this.lessonService.getLessons(this.courseId);
    })
  }

  addLesson(les: lesson) {
    if(les!=null)
      this.lessonService.addLesson(les);
    this.addFlag=false;
  }

  updateLesson(les: lesson) {
    if(les!=null)
      this.lessonService.updateLesson(les.id,les);
    this.editFlag=false;
  }

  deleteLesson(id: Number) {
    this.lessonService.deleteLesson(this.courseId,id);
  }

  add(){
    this.addFlag=true
    this.lessonToChange=new lesson(0,'','',this.courseId)
  }

  edit(les: lesson) {
     this.editFlag=true;
     this.lessonToChange=les;
  }
}