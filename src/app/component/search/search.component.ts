import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedServiceService } from '../shared/shared-service.service';
import { WordShortDirective } from '../../@core/directives/wordShort';
import { MatIconModule } from '@angular/material/icon';
import { CourseSearchRequest, IFilterModel, LevelFilter } from '../../@core/models/commonModel';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SearchTopFiltersComponent } from '../shared/search-top-filters/search-top-filters.component';
import { DataNotFoundComponent } from '../shared/data-not-found/data-not-found.component';


@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule, WordShortDirective, MatIconModule, MatMenuModule, MatCheckboxModule,
    SearchTopFiltersComponent, MatButtonModule, DataNotFoundComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  sendTopFilters!: IFilterModel;

  selectedLevels: string[] = [];   // ex: [0,1]
  isLevelOpen = false;

  keyword!: string;
  pageNumber!: number;
  pageSize: number = 12;
  totalPages!: number;
  totalCount!: number;
  pages: number[] = [];
  // Top Filter Data
  filterData!: any;
  languages: any[] = [];
  ratings: any[] = [];


  searchResultCourse: any[] = [];
  currentCourseId: string = ''

  constructor(private activeRoute: ActivatedRoute, private dataSource: SharedServiceService, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['keyword']) {
        this.keyword = params['keyword']; // Cloud
        this.pageNumber = Number(params['p'] || 1); // 1
        this.searchCourseByKeyword();
      }
    });
    this.sendTopFilters = {};
    this.sendTopFilters = this.dataSource.getTopFiltersData();
  }
  onFilterChange(event: { key: keyof IFilterModel, selected: IFilterModel }) {
    this.filterData = event.selected;
    this.dataSource.setTopFiltersData(this.filterData, event.key);
    this.searchCourseByKeyword();
  }
  // Search Course by keyword
  searchCourseByKeyword() {
    let filters = {};
    if (this.filterData) {
      filters = {
        Level: this.filterData.Level ?? [],
        Language: this.filterData.Language ?? [],
        Rating: this.filterData.Rating ?? [],
        Hours: this.filterData.Hours ?? [],
        VideoLength: this.filterData.VideoLength ?? []
      }
    }
    const payload: CourseSearchRequest = {
      Keyword: this.keyword,
      Page: this.pageNumber,
      PageSize: this.pageSize,
    };
    if (this.filterData && this.hasAnyFilter(this.filterData)) {
      payload.Filters = filters
    }
    this.dataSource.courseSearch(payload).subscribe({
      next: (res) => {
        if (res.results) {
          this.searchResultCourse = res.results;
          this.totalCount = res.count;
          this.totalPages = Math.ceil(this.totalCount / this.pageSize); // 1.877 = 2 
          this.updatePagination();
        }
      },
      error: (err) => { }
    })
  }
  // Update pagination
  updatePagination() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  // Go to Page
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.router.navigate(['/udemy/search/'], {
      queryParams: {
        p: page,
        keyword: this.keyword
      }
    })
  }
  // Add to cart
  addToCart(id: string): void {
    const item = this.searchResultCourse.find(c => c.id === id);
    if (!item) return;
    this.dataSource.addToCartCourse(item);
    this.isIntCart(id);
  }
  isIntCart(courseId: string): boolean {
    return this.dataSource.getCartCourse().some(c => c.id === courseId);
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
  // Go to Course Details Page
  goToDetailsPage(course: any) {
    const slug = this.createSlug(course.title);
    this.router.navigate(['./course', slug, course.id]);
  }
  // Goto Cart
  goToCart() {
    this.router.navigate(['/udemy/cart']);
  }
  // Check has any data available
  private hasAnyFilter(data: IFilterModel): boolean {
    return Object.values(data).some(v => (v ?? []).length > 0);
  }

}
