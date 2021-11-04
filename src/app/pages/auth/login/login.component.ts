import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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



  login() {

    if (this.loginForm.valid) {

      let loginModel: LoginModel = { ...this.loginForm.value };

      this.authService.login(loginModel).subscribe((response) => {
        console.log(response)
        this.toastrService.success(response.message, "Success", { positionClass: 'toast-bottom-right' })
        this.cookieService.set("jwt", response.data.token)
        if (this.rememberMeChecked) {
          this.cookieService.set("email", this.loginForm.controls['email'].value, 1)
        }
        setTimeout(() => window.location.reload(), 1400)
      }, (responseError) => {
        console.log(responseError)
        let responseString = responseError.statusText
        if (responseString.includes("Unknown Error")) {
          this.toastrService.error("Cannot connect to server!", "Error", { positionClass: 'toast-bottom-right' })
        }

        else {
          this.toastrService.error(responseError.error, "Error", { positionClass: 'toast-bottom-right' })
        }



      })

    }
  }
}