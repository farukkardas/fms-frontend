import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { MilkSales } from 'src/app/models/milkSales';
import { CustomerService } from 'src/app/services/customer.service';
import { MilksalesService } from 'src/app/services/milksales.service';

@Component({
  selector: 'app-milksale-add',
  templateUrl: './milksale-add.component.html',
  styleUrls: ['./milksale-add.component.css']
})
export class MilksaleAddComponent implements OnInit {
  modalRef: BsModalRef;
  addMilkSaleGroup: FormGroup;
  customers : Customer[] = [];
  constructor(private cookieService:CookieService ,private formBuilder: FormBuilder,private customerService:CustomerService, private dialogRef: MatDialogRef<MilksaleAddComponent>, private modalService: BsModalService, private milkSaleService: MilksalesService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createAddBullGroup();
    this.getAllCustomers();
  }

  getAllCustomers(){
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.customerService.getUserCustomer(userId,securitykey).subscribe((response)=>{
      this.customers = response.data
    },(responseError)=>{
      responseError.message
    })
  }


  createAddBullGroup() {
    this.addMilkSaleGroup = this.formBuilder.group({
      amount: ['',Validators.required],
      salePrice: ['',Validators.required],
      customerId: ['',Validators.required],
      boughtDate: ['',Validators.required],
      sellerId : [this.cookieService.get("uid")]
    });
  }

  openModal(template: TemplateRef<any>) {
    if (!this.addMilkSaleGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }


  confirm(): void {
    this.addMilkSales();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addMilkSales() {
    if (!this.addMilkSaleGroup.valid) return;

    let milkSaleModel: MilkSales = { ...this.addMilkSaleGroup.value };

    this.milkSaleService.addMilkSales(milkSaleModel).subscribe((response) => {
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
