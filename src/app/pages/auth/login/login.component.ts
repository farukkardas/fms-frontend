import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import * as CryptoJS from 'crypto-js';
import { OperationClaim } from 'src/app/models/operationClaim';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  buttonEnabled: boolean = true;
  loginForm: FormGroup;
  rememberMeChecked: boolean = false;
  public registerLink = "/register";

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.checkIfLogged()
    this.createLoginForm();
    this.checkRememberMeValues();

  }

  checkIfLogged() {
    if (this.cookieService.get("jwt")) {
      this.router.navigate([''])
    }
  }

  checkRememberMeValues() {
    let email = this.cookieService.get("email");

    if (email == null) {
      return
    }

    this.loginForm.controls['email'].setValue(email);
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: [""]
    })
  }

  checkboxChanged() {
    this.rememberMeChecked = !this.rememberMeChecked;
  }

  enableButton() {
    this.buttonEnabled = true;
  }

  login() {

    if (this.loginForm.valid) {

      // Disable button and see what happened. Prevent to spam login button.
      this.buttonEnabled = false;
      setTimeout(() => this.enableButton(), 2000)

      let loginModel: LoginModel = { ...this.loginForm.value };

      this.authService.login(loginModel).subscribe((response) => {
        this.toastrService.success(response.message, "Success", { positionClass: 'toast-bottom-right' })

        this.cookieService.set("jwt", response.data.token)
        this.cookieService.set("uid", response.data.id)
        this.cookieService.set("sk", response.data.securityKey)

        let role: any;

        for (let i = 0; i < response.data.operationClaims.length; i++) {
          role = response.data.operationClaims[i].name;
        }
     


        // encrypt the role and set localstorage
        var userRole = CryptoJS.AES.encrypt(role, 'superkey').toString();
        localStorage.setItem("xx", userRole)

           setTimeout(() => { window.location.reload() }, 1500)
        this
        if (this.rememberMeChecked) {
          this.cookieService.set("email", this.loginForm.controls['email'].value, 1)
        }

      }, (responseError) => {
        console.log(responseError)
        let responseString = responseError.statusText
        if (responseString.includes("Unknown Error")) {
          this.toastrService.error("Error connecting to server!", "Error", { positionClass: 'toast-bottom-right' })
        }

        else {
          this.toastrService.error(responseError.error.message, "Error", { positionClass: 'toast-bottom-right' })
        }

      })

    }
  }
}
