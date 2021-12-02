import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AnimalTypes } from 'src/app/models/animalTypes';
import { Customer } from 'src/app/models/customer';
import { AnimalsalesService } from 'src/app/services/animalsales.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-animalsales-add',
  templateUrl: './animalsales-add.component.html',
  styleUrls: ['./animalsales-add.component.css']
})
export class AnimalsalesAddComponent implements OnInit {
  modalRef: BsModalRef;
  addAnimalSalesGroup: FormGroup;
  customers: Customer[] = [];
  animals: AnimalTypes[] = []

  constructor(private cookieService: CookieService, private formBuilder: FormBuilder, private customerService: CustomerService, private dialogRef: MatDialogRef<AnimalsalesAddComponent>, private modalService: BsModalService, private animalSaleService: AnimalsalesService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createAnimalSalesAddGroup()
    this.getAllCustomers()
    this.animalTypes()
  }

  animalTypes() {
    this.animals = [{ id: 1, animalType: "Cow" }, { id: 2, animalType: "Calf" }, { id: 3, animalType: "Sheep" }, { id: 4, animalType: "Bull" }]
  }
  createAnimalSalesAddGroup() {
    this.addAnimalSalesGroup = this.formBuilder.group({
      amount: ['', Validators.required],
      salePrice: ['', Validators.required],
      animalType: ['', Validators.required],
      customerId: ['', Validators.required],
      boughtDate: ['', Validators.required],
      sellerId: [this.cookieService.get("uid")]
    })
  }

  getAllCustomers() {
    this.customerService.getUserCustomer().subscribe((response) => {
      this.customers = response.data
    }, (responseError) => {
      responseError.message
    })
  }

  openModal(template: TemplateRef<any>) {
    if (!this.addAnimalSalesGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }


  confirm(): void {
    this.addAnimalSales();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addAnimalSales() {

    let saleModel = { ...this.addAnimalSalesGroup.value }

    this.animalSaleService.add(saleModel).subscribe((response) => {
      this.toastrService.success(response.message, "Success", { positionClass: 'toast-bottom-right' })
    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' })
    })
  }

}
