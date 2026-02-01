import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CommonServiceService } from "../common/common-service.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGaurd implements CanActivate {
    constructor(private common$: CommonServiceService, private router: Router ) { };
    canActivate(): boolean {
        if (this.common$.getToken()) {
            return true;
        }
        else {
            this.router.navigate(['/home']);
            return false;
        }
    }
}
