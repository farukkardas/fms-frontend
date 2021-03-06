import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

  modalRef: BsModalRef
  deleteCustomerGroup: FormGroup;
  customers: Customer[] = [];
  property = this.customers[0];
  constructor(private cookieService: CookieService, private customerService: CustomerService, private formBuilder: FormBuilder, private toastrService: ToastrService, private modalService: BsModalService) { }


  ngOnInit(): void {
    this.getAllCustomers();
    this.createDeleteForm();
  }

  createDeleteForm() {
    this.deleteCustomerGroup = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      phoneNumber: ['']
    });


  }

  getAllCustomers() {
  -
    this.customerService.getUserCustomer().subscribe((response) => {
      this.customers = response.data;
    })
  }

  deleteCow() {
    let customerModel: Customer = { ...this.deleteCustomerGroup.value }
    this.customerService.deleteCustomer(customerModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.getAllCustomers();
      this.deleteCustomerGroup.reset() 
      this.createDeleteForm();
    }, (responseError) => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error", { positionClass: 'toast-bottom-right' }
          )
        }
      }

      else {
        this.toastrService.error(responseError.error, "Error", { positionClass: 'toast-bottom-right' })
      }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  confirm() {
    this.deleteCow();
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }

}
