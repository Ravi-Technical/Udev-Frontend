import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { CoursePagedResult, IAddCategoryModel, IAdminAddCourse, IApiResponse, ICountry, IGetAllCategories, ISlider, IStates } from '../model/admin_model';
import { ADMIN_API_URLS } from '../../common/adminApiUrls';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private API_DOMAIN_URL = environment.api_url;

  // For Image Upload Config
  cloudName = 'dhpxexf5k';
  uploadPreset = 'udev_app';
  // For Video Upload Config
  uploadPreset1 = 'udev_videos';
  private courses$ !: Observable<IAdminAddCourse[]>;
  private countries$!: Observable<ICountry[]>;

  constructor(private http: HttpClient) { }

  // Course Image Upload Third Party Cloud Integration
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    return this.http.post(url, formData);
  }
  // Course video upload Cloud integration
  uploadCourseVideo(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset1);
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/video/upload`;
    return this.http.post(url, formData);
  }

  // Add New Category
  udemyAddNewCategory(categoryData: IAddCategoryModel): Observable<IAddCategoryModel> {
    const apiUrl = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_ADD_NEW_CATEGORY}`;
    return this.http.post<IAddCategoryModel>(apiUrl, categoryData);
  }
  // Get All Category List
  udemyGetAllCategories(): Observable<any> {
    const apiUrl = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_ALL_CATEGORIES}`;
    return this.http.get<IGetAllCategories[]>(apiUrl);
  }
  // Get Single Category 
  udemyGetSingleCategory(id: string): Observable<any> {
    const apiUrl = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_SINGLE_CATEGORY}`;
    return this.http.get<IGetAllCategories>(`${apiUrl}/${id}`);
  }
  // Delete Single Row Category
  udemyDeleteSingleRow(id: string): Observable<any> {
    const api_url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_DELETE_SINGLE_CATEGORY}`;
    return this.http.delete(`${api_url}/${id}`);
  }
  // Update Single Row Category 
  udemyUpdateSingleRow(id: string, data: IGetAllCategories): Observable<any> {
    const api_url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_UPDATE_SINGLE_CATEGORY}/${id}`;
    return this.http.put(`${api_url}`, data);
  }

  //********************************************************** Admin Course APIs Implementaion *************************************************************//
  udemyAdminAddCourse(data: IAdminAddCourse): Observable<any> {
    const apiUrl = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_ADD_NEW_COURSE}`;
    return this.http.post(apiUrl, data);
  }
  udemyAdminGetAllCourse(pageNumber: number, pageSize: number): Observable<CoursePagedResult<IAdminAddCourse>> {
    const apiUrl = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_ALL_COURSE}`;
    const params = new HttpParams()
      .set('pagenumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<CoursePagedResult<IAdminAddCourse>>(apiUrl, { params });
  }
  udemyGetSingleCourseById(id: string | null): Observable<any> {
    const apiUrl = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_SINGLE_COURSE_BY_ID}/${id ? id : null}`;
    return this.http.get<IAdminAddCourse>(apiUrl);
  }
  udemyUpdateSingleCourseById(id: string, data: IAdminAddCourse): Observable<any> {
    const apiUrl = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_UPDATE_SINGLE_COURSE_BY_ID}/${id ? id : null}`;
    return this.http.put<IAdminAddCourse>(apiUrl, data);
  }
  udemyDeleteSingleCourseById(id: string): Observable<any> {
    const api_url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_DELETE_SINGLE_COURSE_BY_ID}/${id}`;
    return this.http.delete(api_url);
  }

  // Get Second All Course API Method Calls
  udemyGetAllCourses() {
    const api_url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_ALL_COURSES}`;
    if (!this.courses$) {
      this.courses$ = this.http.get<IAdminAddCourse[]>(api_url).pipe(shareReplay(1));
    }
    return this.courses$;
  }
  // ******************************************** Slider APIs Implementation *************************************** //
  udevAddNewHomeSlider(data: ISlider): Observable<any> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_ADD_HOME_SLIDER}`;
    return this.http.post<ISlider>(api_Url, data);
  }
  udevGetAllHomeSlider(): Observable<any> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_ALL_SLIDER}`;
    return this.http.get<ISlider[]>(api_Url);
  }
  udevGetSliderById(id: string): Observable<any> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_SLIDER_BY_ID}/${id}`;
    return this.http.get<ISlider>(api_Url);
  }
  udevDeleteSliderById(id: string): Observable<any> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_DELETE_SLIDER_BY_ID}/${id}`;
    return this.http.delete<ISlider>(api_Url);
  }
  udevUpdateSliderById(id: string, updatedSlider: ISlider): Observable<ISlider> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_UPDATE_SLIDER_BY_ID}/${id}`;
    return this.http.put<ISlider>(api_Url, updatedSlider);
  }

  // ******************************************** Country State APIs Implementation *************************************** //
  udevAddGenericCountry(data: ICountry): Observable<any> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_ADD_NEW_COUNTRY}`;
    return this.http.post<ICountry>(api_Url, data);
  }
  udevGetAllCountry(): Observable<IApiResponse<ICountry[]>> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_ALL_COUNTRY}`;
    return this.http.get<IApiResponse<ICountry[]>>(api_Url);
  }
  udevGetSingleCountryById(id: string): Observable<ICountry> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_SINGLE_COUNTRY_BY_ID}/${id}`;
    return this.http.get<ICountry>(api_Url);
  }
  udevGetAllStates(): Observable<IStates[]> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_ALL_STATES}`;
    return this.http.get<IStates[]>(api_Url);
  }
  udevUpdateSingleCountryById(id: string, updatedCountry: ICountry): Observable<any> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_UPDATE_SINGLE_COUNTRY_BY_ID}/${id}`;
    return this.http.put<ICountry>(api_Url, updatedCountry);
  }
  udevDeleteSingleCountryById(id: string): Observable<any> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_DELETE_COUNTRY_BY_ID}/${id}`;
    return this.http.delete<ICountry>(api_Url);
  }

  // ******************************************** Country State APIs Implementation *************************************** //
  udevAddNewState(data: IStates): Observable<IApiResponse<IStates>> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_ADD_NEW_STATE}`;
    return this.http.post<IApiResponse<IStates>>(api_Url, data);
  }
  udevGetAllStatesList(): Observable<IApiResponse<IStates[]>> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_ALL_STATES}`;
    return this.http.get<IApiResponse<IStates[]>>(api_Url);
  }
  udevDeleteSingleStateByID(id: string): Observable<IApiResponse<IStates>> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_DELETE_STATE_BY_ID}/${id}`;
    return this.http.delete<IApiResponse<IStates>>(api_Url);
  }
  udevUpdateSingleStateById(id: string, data: IStates) {
    const api_url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_UPDATE_SINGLE_STATE_BY_ID}/${id}`;
    return this.http.put<IApiResponse<IStates>>(api_url, data);
  }
   














} // END MAIN CLASS HERE
