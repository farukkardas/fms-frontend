import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { DecodedJwt } from 'src/app/models/decodedJwt';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('rePassword') rePassword: ElementRef;
  registerForm: FormGroup;
  public loginLink = "/login";
  decodedJwt: DecodedJwt;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private cookieService: CookieService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.checkIfLogged()
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required,]
    })
  }

  checkIfLogged() {
    if (this.cookieService.get("jwt")) {
      this.router.navigate([''])
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }


  register() {

    //şifrelerin eşleşip eşleşmediğini kontrol et
    if (this.registerForm.controls['password'].value != this.rePassword.nativeElement.value) {
      this.toastrService.error("Password are must match!", "Error", { positionClass: 'toast-bottom-right' })
      return;
    }

    let registerModel = { ...this.registerForm.value }

    this.authService.register(registerModel).subscribe((response) => {

      this.decodedJwt = jwt_decode(response.data.token)

      for (const k in this.decodedJwt) {
        if (k === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") {
          this.decodedJwt["id"] = this.decodedJwt[k];
          delete this.decodedJwt[k];
        }
        if (k === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name") {
          this.decodedJwt["name"] = this.decodedJwt[k];
          delete this.decodedJwt[k];
        }
        if (k === "http://schemas.microsoft.com/ws/2008/06/identity/claims/role") {
          this.decodedJwt["role"] = this.decodedJwt[k];
          delete this.decodedJwt[k];
        }
      }
      this.toastrService.success(response.message, "Success", { positionClass: 'toast-bottom-right' })
      this.cookieService.set("jwt", response.data.token)
      this.cookieService.set("uid", this.decodedJwt.id)
      this.cookieService.set("sk", response.data.securityKey)
      setTimeout(() => window.location.reload(), 1400)
    }, (responseError) => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error", { positionClass: 'toast-bottom-right' })
        }
      }


    })

  }

}
function jwt_decode(token: string): DecodedJwt {
  throw new Error('Function not implemented.');
}

