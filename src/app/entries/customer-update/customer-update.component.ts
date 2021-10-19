import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  constructor(private customerService: CustomerService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService,
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
    this.customerService.getAll().subscribe((response) => {
      this.customers = response.data;
    })
  }

  createUpdateCustomerForm() {
    this.updateCustomerGroup = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      phoneNumber: ['']
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
