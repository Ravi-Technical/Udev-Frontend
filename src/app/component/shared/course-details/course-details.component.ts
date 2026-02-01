import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ICourseModel } from '../../../@core/models/commonModel';


@Component({
  selector: 'app-course-details',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {
  currentId: any;
  currentCourseTitle: string | null = null;
  course:any;
  categoryTitle: string | null = null;
  stars = Array(5).fill(0);
  courseFlag:boolean = false;

  constructor(private dataSource: SharedServiceService, private activeRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((res) => {
      this.currentId = res.get('id');
      this.currentCourseTitle = res.get('title');
      this.currentCourseTitle = this.currentCourseTitle ? this.currentCourseTitle.split(' ').join(" ").replaceAll("-", ' ') : '';
      this.getSingleUdevCourseById();
    });
 } // END OnInIt();
   // Get Single Course Method Implementation
  getSingleUdevCourseById(){
    this.courseFlagUpdate();
    this.dataSource.udevGetSingleCourseById(this.currentId).pipe(
      switchMap((course: any) =>
        this.dataSource.UdevGetSingleCategryById(course.data.categoryId).pipe(
          map((category: any) => ({ course, category }))
        )
      )
    ).subscribe(({ course, category }) => { 
      this.course = course.data ? course.data : [];
      this.categoryTitle = category.data.categoryName ? category.data.categoryName: '';
    })
  }
  // Course Flag Update
  courseFlagUpdate(){
     this.courseFlag = this.dataSource.getCartCourse().some(c=>c.id===this.currentId);
  }
  // Add to Cart
  addToCart(item:ICourseModel){
    debugger
     this.dataSource.addToCartCourse(item);
     this.courseFlagUpdate();
  }
  // Goto Cart
  goToCart(){
    this.router.navigate(['/udemy/cart']);
  }
  goToCheckOut(){
    this.router.navigate(['/udemy/checkout']);
  }

}
