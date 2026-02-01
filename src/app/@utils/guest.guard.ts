import { Injectable } from "@angular/core";
import { CommonServiceService } from "../common/common-service.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class GuestGuard implements CanActivate {
    constructor(private common$: CommonServiceService, private router: Router) { };
    canActivate(): boolean {
        if (!this.common$.getToken()) {
            return true;
        } else {
            this.router.navigate(['/home']);
            return false;
        }
    }
}
