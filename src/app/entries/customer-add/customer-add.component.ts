import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  modalRef: BsModalRef;
  addCustomerGroup: FormGroup;

  constructor(private cookieService:CookieService,private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CustomerAddComponent>, private modalService: BsModalService, private customerService: CustomerService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createAddCustomerGroup();
  }


  createAddCustomerGroup() {
    this.addCustomerGroup = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: [''],
      address: [''],
      phoneNumber: [''],
      ownerId : [this.cookieService.get("uid")]
    });
  }

  openModal(template: TemplateRef<any>) {
    
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  confirm(): void {
    this.addNewCustomer();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addNewCustomer() {
    if (!this.addCustomerGroup.valid) return;

    let customerModel: Customer = { ...this.addCustomerGroup.value };

    this.customerService.addCustomer(customerModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.dialogRef.close();
    }, responseError => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error", { positionClass: 'toast-bottom-right' }
          )
        }
      }
    })
  }

}
