import { Routes } from "@angular/router";
import { CourseDetailsComponent } from "./course-details/course-details.component";

export const SHARED_ROUTES:Routes = [
     {path:':title/:id', component:CourseDetailsComponent}
]