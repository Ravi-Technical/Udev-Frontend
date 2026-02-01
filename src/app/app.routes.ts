import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AuthGaurd } from './@utils/authGaurd.gaurd';
import { RoleGaurd } from './@utils/role.gaurd';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'udemy',
        loadChildren: () => 
            import('./component/component.routes').then(m => m.COMPONENT_ROUTES)
    },
    {
        path: 'admin',
        canActivate: [AuthGaurd, RoleGaurd], data: { expectedRole: 'Admin' },
        loadChildren: () => import('./admin-panel/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path:'course',
        loadChildren:()=>import('./component/shared/shared.module').then(m=>m.SharedModule)
    },

    { path: '**', component: HomeComponent }

];
