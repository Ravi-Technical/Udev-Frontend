import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGaurd } from '../@utils/authGaurd.gaurd';
import { GuestGuard } from '../@utils/guest.guard'; 
import { RoleGaurd } from '../@utils/role.gaurd';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'user', component: UserProfileComponent, canActivate: [AuthGaurd, RoleGaurd], data:{expectedRole:'User'} },
  { path: 'cart', component:CartComponent, canActivate:[GuestGuard]},
  { path: 'checkout', component:CheckoutComponent, canActivate:[GuestGuard]},
  { path: 'search', component:SearchComponent, canActivate:[GuestGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
