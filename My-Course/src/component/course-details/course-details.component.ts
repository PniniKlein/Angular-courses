import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // עבור כפתורים
import { MatFormFieldModule } from '@angular/material/form-field'; // עבור שדות טופס
import { MatSelectModule } from '@angular/material/select'; // עבור בחירות
import { MatInputModule } from '@angular/material/input'; // עבור שדות קלט
import { MatStepperModule } from '@angular/material/stepper';
import { CoursesService } from '../../service/courses/courses.service';
import { course } from '../../models/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatIconModule,MatCardModule,MatStepperModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  @Input() course:course;

  @Output() childSaveCurse:EventEmitter<any> = new EventEmitter<any>();
  constructor(private courseService: CoursesService
  ){}
  saveCourse(){
      this.childSaveCurse.emit(this.course);
  }

  cancel(){
      this.childSaveCurse.emit(null);
  }
}
