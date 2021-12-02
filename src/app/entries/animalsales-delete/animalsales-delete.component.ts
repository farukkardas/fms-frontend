import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AnimalSales } from 'src/app/models/animalSales';
import { AnimalSalesDto } from 'src/app/models/animalSalesDto';
import { AnimalsalesService } from 'src/app/services/animalsales.service';

@Component({
  selector: 'app-animalsales-delete',
  templateUrl: './animalsales-delete.component.html',
  styleUrls: ['./animalsales-delete.component.css']
})
export class AnimalsalesDeleteComponent implements OnInit {
  modalRef: BsModalRef;
  animalSales: AnimalSalesDto[] = [];
  deleteSaleGroup: FormGroup;
  property = this.animalSales[0];
  constructor(private cookieService: CookieService, private modalService: BsModalService, private animalSalesService: AnimalsalesService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
   
  this.createDeleteSaleForm()
  this.getAllSales();
  }


  getAllSales() {
    this.animalSalesService.getUserAnimalSales().subscribe((response) => {
      this.animalSales = response.data;
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
    let animalModel: AnimalSales = { ...this.deleteSaleGroup.value }
    
    this.animalSalesService.delete(animalModel).subscribe((response) => {
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
