import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseListComponent } from './course-list/course-list.component'; 
import { AddHomeSliderComponent } from './add-home-slider/add-home-slider.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    AddHomeSliderComponent,
    AddCourseComponent,
    CourseListComponent, 
  ]
})
export class AdminPanelModule { }
