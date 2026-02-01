import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { CommonServiceService } from "../common/common-service.service";
import { MatDialog } from "@angular/material/dialog";
import { SuccessDialogComponent } from "../component/shared/success-dialog/success-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class RoleGaurd implements CanActivate {
    constructor(private commonService: CommonServiceService, private dialog: MatDialog, private router:Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data['expectedRole'];
        const currentRole = this.commonService.getRole();
        if (currentRole != expectedRole) {
            this.dialog.open(SuccessDialogComponent, {
                width: '500px',
                data: { title:'Unauthorized', message: '401 Unauthorized: Access is denied due to invalid credentials' }
            })
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }

}