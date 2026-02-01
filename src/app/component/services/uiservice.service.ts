import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISlider } from '../../admin-panel/model/admin_model';
import { ADMIN_API_URLS } from '../../common/adminApiUrls';

@Injectable({
  providedIn: 'root'
})
export class UIServiceService {
  private API_DOMAIN_URL = environment.api_url;

  constructor(private http: HttpClient) { }

  udev_UIGetAllHomeSlider(): Observable<any> {
    const api_Url = `${this.API_DOMAIN_URL}${ADMIN_API_URLS.ADMIN_GET_ALL_SLIDER}`;
    return this.http.get<ISlider[]>(api_Url);
  }






} // END CLASS
