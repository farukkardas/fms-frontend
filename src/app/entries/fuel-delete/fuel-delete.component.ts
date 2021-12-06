import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FuelConsumption } from 'src/app/models/fuelConsumption';
import { FuelconsumptionComponent } from 'src/app/pages/fuelconsumption/fuelconsumption.component';
import { FuelConsumptionService } from 'src/app/services/fuelconsumption.service';

@Component({
  selector: 'app-fuel-delete',
  templateUrl: './fuel-delete.component.html',
  styleUrls: ['./fuel-delete.component.css']
})
export class FuelDeleteComponent implements OnInit {
  modalRef: BsModalRef;
  deleteFuelGroup: FormGroup;
  fuels: FuelConsumption[] = [];
  property = this.fuels[0];
  constructor(private cookieService:CookieService,private fuelConsumptionService: FuelConsumptionService, private formBuilder: FormBuilder, private toastrService: ToastrService, private modalService: BsModalService) { }


  ngOnInit(): void {
    this.getAllFuels();
    this.createDeleteForm();
  }

  createDeleteForm() {
    this.deleteFuelGroup = this.formBuilder.group({
      id: [''],
      fuelType: [''],
      amount: [''],
      price: [''],
      boughtDate: [''],
      ownerId : [this.cookieService.get("uid")]
    });


  }

  getAllFuels() {


    this.fuelConsumptionService.getUserFuelConsumptions().subscribe((response) => {
      this.fuels = response.data;
    })
  }

  deleteCow() {
    let fuelModel: FuelConsumption = { ...this.deleteFuelGroup.value }
    this.fuelConsumptionService.deleteFuel(fuelModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      
      this.getAllFuels();
      this.deleteFuelGroup.reset() 
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
