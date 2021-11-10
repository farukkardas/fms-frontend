import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  customers: Customer[] = [];
  modalRef: BsModalRef;
  updateCustomerGroup: FormGroup;
  property = this.customers[0];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private cookieService: CookieService, private customerService: CustomerService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.createUpdateCustomerForm();
  }

  confirm() {
    this.updateBull();
    this.modalRef.hide();

  }

  decline() {
    this.modalRef.hide();
  }

  get customerId() {
    return this.updateCustomerGroup.get('id')
  };

  getAllCustomers() {
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.customerService.getUserCustomer(userId, securitykey).subscribe((response) => {
      this.customers = response.data;
    })
  }

  createUpdateCustomerForm() {
    this.updateCustomerGroup = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      ownerId: [this.cookieService.get("uid")]
    });
  }




  openModal(template: TemplateRef<any>) {
    if (!this.updateCustomerGroup.valid) { return }

    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }



  updateBull() {
    let updateCustomerModel: Customer = { ...this.updateCustomerGroup.value };

    this.customerService.updateCustomer(updateCustomerModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });

      //After success load bulls again (Temporary, needs to be async)
      this.getAllCustomers();

    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

}
