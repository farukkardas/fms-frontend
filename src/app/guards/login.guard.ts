import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  isAuthenticated:boolean;

  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true;
      return true;
    } else {

     if(this.isAuthenticated == true){
       this.isAuthenticated = false
       window.location.reload()
     }
      this.router.navigate(["/login"])
      this.toastrService.info("You must log in to view this page!","Error", { positionClass: 'toast-bottom-right' })
      return false;
    }
  }



}
