import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MilkSales } from 'src/app/models/milkSales';
import { MilkSalesDto } from 'src/app/models/milkSalesDto';
import { MilksalesService } from 'src/app/services/milksales.service';

@Component({
  selector: 'app-milksale-delete',
  templateUrl: './milksale-delete.component.html',
  styleUrls: ['./milksale-delete.component.css']
})
export class MilksaleDeleteComponent implements OnInit {

  modalRef: BsModalRef;
  milkSales: MilkSalesDto[] = [];
  deleteSaleGroup: FormGroup;
  property = this.milkSales[0];
  constructor(private cookieService:CookieService,private modalService: BsModalService, private milkSalesService: MilksalesService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllSales();
    this.createDeleteSaleForm();
  }

  getAllSales() {
   

    this.milkSalesService.getUserMilkSales().subscribe((response) => {
      this.milkSales = response.data;
    })
  }

  createDeleteSaleForm() {
    this.deleteSaleGroup = this.formBuilder.group({
      id: [''],
      amount: [''],
      salePrice: [''],
      customerId: [''],
      boughtDate: [''],
      sellerId : [this.cookieService.get("uid")]
    });


  }


  confirm(): void {
    this.deleteSale();
    this.modalRef.hide();
  }

  deleteSale() {
    let milkModel: MilkSales = { ...this.deleteSaleGroup.value }
    
    this.milkSalesService.deleteMilkSales(milkModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.getAllSales();
      this.deleteSaleGroup.reset() 
      this.createDeleteSaleForm();
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



  decline() {
    this.modalRef.hide();
  }

}
