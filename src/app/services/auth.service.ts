import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:5000/api/auth/";
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel);
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel);
  }

  logout() {
    this.cookieService.delete("jwt")
    this.cookieService.delete("uid")
    this.cookieService.delete("sk")
    window.location.reload()
  }

  isAuthenticated() {
    if (this.cookieService.get("jwt")) {
      return true;
    }
    else {
      return false;
    }
  }

}
