import { Inject, inject, Injectable, PLATFORM_ID, signal, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private _isLoggedIn = signal<boolean>(false);
  public readonly isLoggedIn = this._isLoggedIn.asReadonly();
  user = signal<{ email: string; fullName: string } | null>(null);
  authRole = signal<string | null>(null);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    // auto restore token if present
    if (this.isBrowser()) {
      const token = localStorage.getItem('Token');
      const role = JSON.parse(localStorage.getItem('Role')!);
      if (token && role) { 
        this._isLoggedIn.set(true);
        this.authRole.set(role);
        const userInfo = JSON.parse(localStorage.getItem('UserInfo')!);
        const modifyName = userInfo?.fullName.split(" ")[0].charAt(0) + userInfo?.fullName.split(" ")[1].charAt(0);
        if (userInfo) {
          this.user.set(modifyName);
        }
      }
    } 
  }

  // ********************** Udemy Set Token Service Method ********************** //
  setUserToken(token: string, userInfo: any): void {
    const modifyName = userInfo?.fullName.split(" ")[0].charAt(0) + userInfo?.fullName.split(" ")[1].charAt(0);
    this.user.set(modifyName);
    this._isLoggedIn.set(true);
    this.authRole.set(userInfo.role);
    if (this.isBrowser()) {
      localStorage.setItem('Token', JSON.stringify(token));
      localStorage.setItem('UserInfo', JSON.stringify(userInfo));
      localStorage.setItem('Role', JSON.stringify(userInfo.role));
    }
  }

  // ********************** Udemy Remove Token Service Method ********************** //
  clearToken() {
    if (this.isBrowser()) {
      localStorage.removeItem('Token');
      localStorage.removeItem('UserInfo');
      localStorage.removeItem('Role');
      localStorage.removeItem('currentUserEmail');
    }
    this.user.set(null);
    this._isLoggedIn.set(false);
    this.authRole.set(null);
  }
  // Get role info
  getRole(){
    const userInfo = this.isBrowser() ? JSON.parse(localStorage.getItem('UserInfo')!):null;
    return userInfo.role;
  }
  // Utility: safe browser check
  getToken(): string | null {
    return this.isBrowser() ? JSON.parse(localStorage.getItem('Token')!) : null;
  }

  // Get Current User Email
  getCurrenUserEmail(): string | null {
    return this.isBrowser() ? localStorage.getItem('currentUserEmail') : null;
  }

  // Safe SSR browser check
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
 
 
 

 






























}
