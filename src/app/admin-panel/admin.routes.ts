import { Routes } from "@angular/router";
import { AddCourseComponent } from "./add-course/add-course.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";
import { AddHomeSliderComponent } from "./add-home-slider/add-home-slider.component";
import { CountryStateComponent } from "./country-state/country-state.component";

export const ADMIN_ROUTES: Routes = [
  //{ path: '', redirectTo: CourseListComponent, pathMatch: 'full' }, // Default admin child
  { path: 'add-course', component: AddCourseComponent },
  { path: 'add-course/:id', component: AddCourseComponent },
  { path: 'course-list', component: CourseListComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'admin-profile', component:AdminProfileComponent},
  { path: 'add-home-slider', component: AddHomeSliderComponent},
  { path: 'country-state', component:CountryStateComponent}  
];