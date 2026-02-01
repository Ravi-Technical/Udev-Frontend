import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL_MAPPING } from '../../common/apiUrlMapping';
import { isPlatformBrowser } from '@angular/common';
import { CourseOrderResponse, CourseSearchRequest, IApiResponse, ICountry, ICourseModel, IFilterModel, IStates, VerifyOrderPaymentModel } from '../../@core/models/commonModel';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private API_DOMAIN_URL = environment.api_url;
  private cartItems: any[] = []; // ["ffer", "dfd", "kjjjhjh"]
  private cartCountSource = new BehaviorSubject<number>(0);
  public cartCount = this.cartCountSource.asObservable(); // Header will subscribe
  private filters: IFilterModel = {
    Language: [],
    Level: [],
    Rating: [],
    Hours: [],
    VideoLength: []
  };

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    const addToCart = this.isBrowser() ? localStorage.getItem('cart') : '';
    if (addToCart && this.isBrowser()) {
      this.cartItems = JSON.parse(addToCart);
      this.cartCountSource.next(this.cartItems.length);
    }
  }
  // Set Top Filter Data
  setTopFiltersData(filterData: IFilterModel, key: string) {
    const data = Array.isArray(filterData) ? filterData : [filterData];
    for (let item of data) {
      switch (key) {
        case 'Language':
          this.filters.Language = item.Language;
          break;
        case 'Level':
          this.filters.Level = item.Level;
          break;
        case 'Ratings':
          this.filters.Rating = item.Rating;
          break;
        default:
          this.filters = {};
          break;
      }
    }
  }
  // Get Top Filter Data
  getTopFiltersData(): IFilterModel {
    return this.filters;
  }
  // Clear filter data
  clearFilters() {
    this.filters = {
      Language: [],
      Level: [],
      Rating: [],
      Hours: [],
      VideoLength: []
    };
  }
  // Add to cart course
  addToCartCourse(course: ICourseModel) {
    this.cartItems.push(course);
    this.updateAddToCart();
  }
  // Update Cart
  updateAddToCart() {
    this.cartCountSource.next(this.cartItems.length);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  // Remove course from cart
  removeCourseFromCart(id: string) {
    this.cartItems = this.cartItems.filter(c => c.id != id);
    this.updateAddToCart();
  }
  // Remove Cart Item 
  clearCartItem():void{
    localStorage.removeItem('cart'); 
    this.cartItems = [];
    this.cartCountSource.next(0);
  }
  // Get Cart Item
  getCartCourse() {
    return this.cartItems;
  }
  // Get Second All Course API Method Calls
  udevGetAllCourses(): Observable<any> {
    const api_url = `${this.API_DOMAIN_URL}${API_URL_MAPPING.USER_ALL_COURSES}`;
    return this.http.get(api_url);
  }
  // Get All Category API Method Calls
  udevGetAllCategory(): Observable<any> {
    const api_url = `${this.API_DOMAIN_URL}${API_URL_MAPPING.GET_ALL_CATEOGRY}`;
    return this.http.get(api_url);
  }
  // Get Single Course By Id
  udevGetSingleCourseById(id: string): Observable<any> {
    const apiUrl = `${this.API_DOMAIN_URL}${API_URL_MAPPING.GET_SINGLE_COURSE_BY_Id}/${id}`;
    return this.http.get(apiUrl);
  }
  //Get Single Category By Id
  UdevGetSingleCategryById(id: string): Observable<any> {
    const api_url = `${this.API_DOMAIN_URL}${API_URL_MAPPING.GET_SINGLE_CATEGORY_BY_Id}/${id}`;
    return this.http.get(api_url);
  }
  // Course Search
  courseSearch(payload: CourseSearchRequest): Observable<any> {
    const api_url = `${this.API_DOMAIN_URL}${API_URL_MAPPING.COURSE_SEARCH}`;
    return this.http.post(api_url, payload);
  }
  // Search Course Top Filters
  courseSearchTopFilters(): Observable<any> {
    const api_url = `${this.API_DOMAIN_URL}${API_URL_MAPPING.COURSE_SEARCH_TOP_FILTERS}`;
    return this.http.get<any>(api_url);
  }

  //***************************  CHECKOUT SERVICE METHOD  ******************************* // 
  coursePaymentOrderCreate(payload: any): Observable<CourseOrderResponse> {
    const api_url = `${this.API_DOMAIN_URL}${API_URL_MAPPING.PAYMENT_ORDER_CREATE_URL}`;
    return this.http.post<CourseOrderResponse>(api_url, payload);
  }
  coursePaymentVerify(payload: VerifyOrderPaymentModel): Observable<boolean> {
    const api_url = `${this.API_DOMAIN_URL}${API_URL_MAPPING.PAYMENT_VERIFY_URL}`;
    return this.http.post<boolean>(api_url, payload);
  }

  //***************************  CHECKOUT SERVICE METHOD  *******************************// 
  udevGetAllCountry(): Observable<IApiResponse<ICountry[]>>{
    const api_Url = `${this.API_DOMAIN_URL}${API_URL_MAPPING.UDEV_GET_ALL_COUNTRY}`;
    return this.http.get<IApiResponse<ICountry[]>>(api_Url);
  }

  getCurrentUserId(): string | null {
    const userInfo = this.isBrowser() ? JSON.parse(localStorage.getItem('UserInfo')!) : null;
    return userInfo ? userInfo.id : null;
  }


  // Safe SSR browser check
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
 

}  // END MAIN/WRAPER CLASS HERE
