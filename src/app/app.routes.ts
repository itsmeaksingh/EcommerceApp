import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { ProductComponent } from './product/product.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { SellerDashboardComponent } from './customer/seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { AdminAuthGuardLogin, AdminAuthGuardService, BuyerAuthGuardService, SellerAuthGuardService, SellerBuyerAuthGuardLogin } from './shared/services/auth-guard.service';

export const routes: Routes = [
    {
        path: "", redirectTo: "home", pathMatch: "full"
    },
    {
        path: "home", component: HomeComponent, title: "Home Page"
    },
    {
        path: "my-profile", component: UserProfileComponent, title: "User Profile Page"
    },
    {
        path: "contact-us", component: ContactUsComponent, title: "Contact-us Page"
    },
    //Admin Work
    {
        path: "", canActivate: [AdminAuthGuardLogin], children: [
            {
                path: "admin-login", component: AdminLoginComponent, title: "Admin Login Page"
            }
        ]
    },
    {
        path: "", canActivate: [AdminAuthGuardService], children: [
            {
                path: "admin-dashboard", component: AdminDashboardComponent, title: "Admin Dashboard Page"
            },
            {
                path: "admin/user", component: UserCrudComponent, title: "Admin User Page"
            },
            {
                path: "admin/product", component: ProductComponent, title: "Admin Product Page"
            }
        ]
    },
    {
        path: "", canActivate: [SellerBuyerAuthGuardLogin], children: [
            {
                path: "sign-in", component: SigninSignupComponent, title: "Sign In Page"
            },
            {
                path: "sign-up", component: SigninSignupComponent, title: "Sign Up Page"
            }
        ]
    },
    {
        path: "", canActivate: [SellerAuthGuardService], children: [
            {
                path: "seller-dashboard", component: SellerDashboardComponent
            },
            {
                path: "seller/product", component: ProductComponent
            }
        ]
    },
    {
        path: "", canActivate: [BuyerAuthGuardService], children: [
            {
                path: "buyer-dashboard", component: BuyerDashboardComponent
            },
            {
                path: "checkout", component: CheckoutComponent
            }
        ]
    },
    {
        path: "**", component: PageNotFoundComponent
    }
];
