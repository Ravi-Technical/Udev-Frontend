import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OverlayComponentComponent } from '../overlay-component/overlay-component.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-skills-place',
  imports: [CommonModule, MatIconModule, MatTabsModule, CarouselModule, ButtonModule, TagModule, MatTooltipModule],
  templateUrl: './skills-place.component.html',
  styleUrl: './skills-place.component.scss'
})
export class SkillsPlaceComponent implements OnInit {
  hideShowComponent: boolean = false;
  public storeWholeCourse: any[] = [];
  public storeWholeCategory: any[] = [];
  public filtredCourse: any[] = [];
  isDataReady = false;
  responsiveOptions: any[] | undefined;
  private overlayRef?: OverlayRef;
  isInitialLoad:boolean = true;

  constructor(private router: Router, private sharedService: SharedServiceService, private overlay: Overlay) { }
  ngOnInit(): void {
    this.getWholeGenericCourses();
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  // Create Slug like title for SEO friendly 
  createSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')   // remove special chars
      .replace(/\s+/g, '-')       // replace spaces with -
      .replace(/--+/g, '-');
  }
  // Goto Course Details Page
  goToDetailsPage(course: any) {
    const slug = this.createSlug(course.title);
    this.router.navigate(['./course', slug, course.id]);
  }
  // Get Current Category Filter
  onTabChange(event: any) {
    if(this.isInitialLoad) return;
    this.filtredCourse = []
    const category = this.storeWholeCategory[event.index];
    this.reuseFilter(category.id);
    // this.filtredCourse = [...this.storeWholeCourse.filter(
    //   c => c.categoryId == category.id
    // )];

  }
  // Get All Courses 
  getWholeGenericCourses() {
    this.sharedService.udevGetAllCourses().subscribe({
      next: (result) => {
        this.storeWholeCourse = result.success ? result.data : [];
        this.getWholeGenericCategory();
      },
      error: (error) => { }
    })
  }
  // Get All Category
  getWholeGenericCategory() {
    this.sharedService.udevGetAllCategory().subscribe({
      next: (result) => {
        this.storeWholeCategory = result.success ? result.data : [];
        const firstCategory = this.storeWholeCategory[0].id;
        if (this.storeWholeCourse.length > 0) {
          this.isDataReady = true;
            this.reuseFilter(firstCategory);
            this.isInitialLoad = false;
        }
      },
      error: (error) => { }
    })
  }
  // Reuseable filter used here
  reuseFilter(catId: string) {
    this.filtredCourse = this.storeWholeCourse.filter((course: any) => {
      return course.categoryId == catId;
    });
  }
  trackByCourseId(index: number, item: any) {
  return item.id;
}
  // Over lay implementation
  openPreview(target: HTMLElement, course: any) {
    this.closePreview();// Before open overly close it self
    const position = this.overlay.position()
      .flexibleConnectedTo(target)
      .withFlexibleDimensions(true)
      .withViewportMargin(8)
      .withPositions([
        // Position 1: OPEN RIGHT (default)
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 15
        },
        // Position 2: OPEN LEFT (fallback)
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: -15
        },
        // Position 3: OPEN BELOW
        // {
        //   originX: 'start',
        //   originY: 'bottom',
        //   overlayX: 'start',
        //   overlayY: 'top',
        //   offsetY: 10
        // },
        // Position 4: OPEN ABOVE
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -10
        }
      ]);
    this.overlayRef = this.overlay.create({
      positionStrategy: position,
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
    const previewPortal = new ComponentPortal(OverlayComponentComponent);
    const previewComponentRef = this.overlayRef.attach(previewPortal);
    previewComponentRef.instance.course = course;
  }

  // Overlay close
  closePreview() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null!;
    }
  }


}
