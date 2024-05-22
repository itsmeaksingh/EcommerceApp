import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs';

// admin before login check
@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuardLogin implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if (role === "admin") {
      this._router.navigate(["/admin-dashboard"]);
      return false;
    } else {
      return true;
    }
  }
}

// admin after login check
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if (role === "admin") {
      return true;
    } else {
      this._router.navigate(["/admin-dashboard"]);
      return false;
    }
  }
}


// Customer (Buyer & Seller) before login check
@Injectable({
  providedIn: 'root'
})
export class SellerBuyerAuthGuardLogin implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if (role === "seller") {
      this._router.navigate(["/seller-dashboard"]);
      return false;
    } if (role === "buyer") {
      this._router.navigate(["/buyer-dashboard"]);
      return false;
    } else {
      return true;
    }
  }
}


// buyer after login check
@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if (role === "buyer") {
      return true;
    } else {
      this._router.navigate(["/sign-in"]);
      return false;
    }
  }
}

// seller after login check
@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if (role === "seller") {
      return true;
    } else {
      this._router.navigate(["/sign-in"]);
      return false;
    }
  }
}