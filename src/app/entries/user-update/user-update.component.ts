import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  modalRef: BsModalRef;
  editUserGroup: FormGroup;
  
  constructor(private toastrService: ToastrService, private formBuilder: FormBuilder, private userService: UserService, private cookieService: CookieService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.createUpdateForm()
  }

  confirm() {
    this.updateUser();
    this.modalRef.hide();

  }

  decline() {
    this.modalRef.hide();
  }

  createUpdateForm() {
    this.editUserGroup = this.formBuilder.group({

      id: [this.cookieService.get('uid')],
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
      phoneNumber: ["",Validators.required],
      city: ["",Validators.required,],
      district: ["",Validators.required],
      address: ["",Validators.required]
    });
  }

  openModal(template: TemplateRef<any>) {
    if (!this.editUserGroup.valid) { return }

    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })

  }


  updateUser() {

    let editModel = { ...this.editUserGroup.value }
    this.userService.updateUser(editModel).subscribe((response) => {

      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });

    }, (responseError) => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error", { positionClass: 'toast-bottom-right' }
          )
        }
      }
    })

  }
}


