import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { API_URL_MAPPING } from '../../common/apiUrlMapping';
import { IULogin, IURegisterModel, IUserOtpSend } from '../../@core/models/commonModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private API_DOMAIN_URL = environment.api_url;

  isDefaultHeader: boolean = false;

  constructor(private http: HttpClient) { }

  // ********************** Udemy New User Registration Service Method ********************** //
  udemyUserRegister(userData: IURegisterModel): Observable<any> {
    const registerUrl = `${this.API_DOMAIN_URL}${API_URL_MAPPING.REGISTER_API_URL}`;
    return this.http.post<IURegisterModel>(registerUrl, userData);
  }

  // ********************** Udemy User Login Service Method ********************** //
  udemyUserLogin(userData: IULogin): Observable<any> {
    if (userData.email == 'ravis3682@gmail.com') {
      userData.role = "Admin"
    } else {
      userData.role = "User"
    }
    const otpUrl = `${this.API_DOMAIN_URL}${API_URL_MAPPING.LOGIN_API_URL}`;
    return this.http.post<IURegisterModel>(otpUrl, userData);
  }

  // ********************** Udemy User Login Service Method ********************** //
  udemyEmailOtpSend(userData: any): Observable<any> {
    const otpEmailSendUrl = `${this.API_DOMAIN_URL}${API_URL_MAPPING.OTP_SEND_API_URL}`;
    return this.http.post<any>(otpEmailSendUrl, { email: userData });
  }

  udemyGetUserDetail(email: string): Observable<any> {
    const getUserDetailUrl = `${this.API_DOMAIN_URL}${API_URL_MAPPING.AUTH_USER_DETAIL}`;
    return this.http.get<any>(getUserDetailUrl, { params: { email } });
  }

  udemyGetDashboardAccess() {
    const getAdminUrl = `${this.API_DOMAIN_URL}${API_URL_MAPPING.Dashboard}`;
    return this.http.get<any>(getAdminUrl);
  }

  udemyGetUserProfile() {
    const getAdminUrl = `${this.API_DOMAIN_URL}${API_URL_MAPPING.userProfile}`;
    return this.http.get<any>(getAdminUrl);
  }


} 
