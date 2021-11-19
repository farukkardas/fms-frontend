import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { MilkSales } from 'src/app/models/milkSales';
import { MilkSalesDto } from 'src/app/models/milkSalesDto';
import { CustomerService } from 'src/app/services/customer.service';
import { MilksalesService } from 'src/app/services/milksales.service';

@Component({
  selector: 'app-milksale-update',
  templateUrl: './milksale-update.component.html',
  styleUrls: ['./milksale-update.component.css']
})
export class MilksaleUpdateComponent implements OnInit {
  milkSales: MilkSalesDto[] = [];
  customers:Customer[] = [];
  modalRef: BsModalRef;
  updateMilkSaleGroup: FormGroup;
  property = this.milkSales[0];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private cookieService:CookieService,private customerService:CustomerService,private milkSaleService: MilksalesService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllSales();
    this.getAllCustomers();
    this.createUpdateSalesForm();
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


  confirm() {
    this.updateSales();
    this.modalRef.hide();

  }

  decline() {
    this.modalRef.hide();
  }

  get customerId() {
    return this.updateMilkSaleGroup.get('id')
  };

  getAllSales() {

    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.milkSaleService.getUserMilkSales(userId,securitykey).subscribe((response) => {
      console.log(response.data)
      this.milkSales = response.data;
    })
  }

  createUpdateSalesForm() {
    this.updateMilkSaleGroup = this.formBuilder.group({
      id: ['',Validators.required],
      amount: ['',Validators.required],
      salePrice: ['',Validators.required],
      customerId: ['',Validators.required],
      boughtDate: ['',Validators.required],
      sellerId : [this.cookieService.get("uid")]
    });
  }




  openModal(template: TemplateRef<any>) {
    if (!this.updateMilkSaleGroup.valid) { return }

    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }



  updateSales() {
    let updateMilkSalesModel: MilkSales = { ...this.updateMilkSaleGroup.value };

    this.milkSaleService.updateMilkSales(updateMilkSalesModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });

  
      this.getAllSales();

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

}
