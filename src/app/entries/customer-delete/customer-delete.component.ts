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
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")
    this.customerService.getUserCustomer(userId, securitykey).subscribe((response) => {
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
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
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
