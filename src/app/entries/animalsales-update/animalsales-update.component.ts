import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AnimalSales } from 'src/app/models/animalSales';
import { AnimalSalesDto } from 'src/app/models/animalSalesDto';
import { AnimalTypes } from 'src/app/models/animalTypes';
import { Customer } from 'src/app/models/customer';
import { AnimalsalesService } from 'src/app/services/animalsales.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-animalsales-update',
  templateUrl: './animalsales-update.component.html',
  styleUrls: ['./animalsales-update.component.css']
})
export class AnimalsalesUpdateComponent implements OnInit {
  animalSales: AnimalSalesDto[] = [];
  customers: Customer[] = [];
  modalRef: BsModalRef;
  updateAnimalSaleGroup: FormGroup;
  property = this.animalSales[0];
  dtTrigger: Subject<any> = new Subject<any>();
  animals: AnimalTypes[] = [];
  constructor(private cookieService: CookieService, private customerService: CustomerService, private animSaleService: AnimalsalesService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllCustomers()
    this.getAllSales()
    this.createUpdateSalesForm()
    this.animalTypes()
  }

  animalTypes() {
    this.animals = [{ id: 1, animalType: "Cow" }, { id: 2, animalType: "Calf" }, { id: 3, animalType: "Sheep" }, { id: 4, animalType: "Bull" }]
  }

  getAllCustomers() {

    this.customerService.getUserCustomer().subscribe((response) => {
      this.customers = response.data
    }, (responseError) => {
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
    return this.updateAnimalSaleGroup.get('id')
  };

  openModal(template: TemplateRef<any>) {
    if (!this.updateAnimalSaleGroup.valid) { return }

    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }


  getAllSales() {

    this.animSaleService.getUserAnimalSales().subscribe((response) => {
      this.animalSales = response.data;
    })
  }

  updateSales() {
    let updateModel: AnimalSales = { ...this.updateAnimalSaleGroup.value };

    this.animSaleService.update(updateModel).subscribe((response) => {
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


  createUpdateSalesForm() {
    this.updateAnimalSaleGroup = this.formBuilder.group({
      id: ['', Validators.required],
      amount: ['', Validators.required],
      salePrice: ['', Validators.required],
      animalType: ['', Validators.required],
      customerId: ['', Validators.required],
      boughtDate: ['', Validators.required],
      sellerId: [this.cookieService.get("uid")]
    });
  }


}
