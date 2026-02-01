import { Route, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { GuestGuard } from "../@utils/guest.guard";
import { RegisterComponent } from "./register/register.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { AuthGaurd } from "../@utils/authGaurd.gaurd";
import { RoleGaurd } from "../@utils/role.gaurd";
import { SearchComponent } from "./search/search.component";
import { ThankYouComponent } from "./thank-you/thank-you.component";

export const COMPONENT_ROUTES:Routes = [
   { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
   { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
   { path: 'user', component: UserProfileComponent, canActivate: [AuthGaurd, RoleGaurd], data:{expectedRole:'User'} },
   { path: 'cart', component:CartComponent},
   { path: 'checkout', component:CheckoutComponent},
   { path: 'search', component:SearchComponent},
   { path: 'thankyou', component:ThankYouComponent}
];
