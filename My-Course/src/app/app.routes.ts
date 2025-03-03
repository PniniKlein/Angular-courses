import { Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { RegisterComponent } from '../component/register/register.component';
import { CoursesComponent } from '../component/courses/courses.component';
import { LessonsComponent } from '../component/lessons/lessons.component';
import { HomeComponent } from '../component/home/home.component';
import { entryAuthGuard } from '../guard/entry-auth.guard';

export const routes: Routes = [
    {path: '',component: HomeComponent},
    {path: 'Login',component: LoginComponent},
    {path: 'Register',component: RegisterComponent},
    {path: 'Courses',component: CoursesComponent,canActivate:[entryAuthGuard]},
    {path: 'Courses/:id',component: LessonsComponent}
];
