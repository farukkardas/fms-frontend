import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:5000/api/auth/";
  constructor(private router: Router, private httpClient: HttpClient, private cookieService: CookieService, private toastrService: ToastrService) { }



  login(loginModel: LoginModel) {
    let allPath = this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(allPath, loginModel);
  }

  register(registerModel: RegisterModel) {
    let allPath = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(allPath, registerModel);
  }


  checkSecurityKeyOutdated(id: string): Observable<ResponseModel> {
    const formData = new FormData();
    formData.append("id", id);
    return this.httpClient.post<ResponseModel>(this.apiUrl + "checkskoutdated", formData);
  }

  checkSkOutdated() {
    let uid = this.cookieService.get("uid");

    if (uid == null) {
      this.logout()
    }
    this.checkSecurityKeyOutdated(uid).subscribe(response => {
      //
    }, (responseError) => {
      setTimeout(() => this.logout(), 200)
    })
  }


  logout() {
    this.cookieService.delete("jwt")
    this.cookieService.delete("uid")
    this.cookieService.delete("sk")
    localStorage.clear()
  setTimeout(()=>{  window.location.reload() },250) 
    this.router.navigate(["/login"])
  }

  isAuthenticated() {
    if (this.cookieService.get("jwt") && this.cookieService.get("sk")) {
      return true;
    }
    else {
      return false;
    }
  }

  isAdminOrUser() {

    let getRole = localStorage.getItem('xx')
    if (getRole == null) { return false; }

    let bytes = CryptoJS.AES.decrypt(getRole, 'superkey');
    let decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

    if (this.cookieService.get("jwt") && this.cookieService.get("sk") && decryptedRole.includes("admin") || decryptedRole.includes("user")) {
      return true;
    }

    else {
      return false;
    }
  }

}
