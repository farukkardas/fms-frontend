import { CookedRawString } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private cookieService: CookieService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.checkIfLogged()
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required,Validators.minLength(8)]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
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


  register() {
    if (!this.registerForm.valid) return;

    //şifrelerin eşleşip eşleşmediğini kontrol et
    if (this.registerForm.controls['password'].value != this.rePassword.nativeElement.value) {
      this.toastrService.error("Password are must match!", "Error", { positionClass: 'toast-bottom-right' })
      return;
    }

    let registerModel = { ...this.registerForm.value }

    this.authService.register(registerModel).subscribe((response) => {
      this.toastrService.success(response.message, "Success", { positionClass: 'toast-bottom-right' })
      this.cookieService.set("jwt", response.data.token)
      setTimeout(()=>window.location.reload(),1400)
    }, (responseError) => {
      console.log(responseError)
      if(responseError.error.Errors.length>0){
        for(let i=0; i < responseError.error.Errors.length;i++){
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "Error", { positionClass: 'toast-bottom-right' })
        }
      }
    
      
    })

  }

}
