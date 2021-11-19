import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FuelConsumption } from 'src/app/models/fuelConsumption';
import { FuelConsumptionService } from 'src/app/services/fuelconsumption.service';

@Component({
  selector: 'app-fuel-add',
  templateUrl: './fuel-add.component.html',
  styleUrls: ['./fuel-add.component.css']
})
export class FuelAddComponent implements OnInit {
  modalRef: BsModalRef;
  addFuelGroup: FormGroup;
  constructor(private cookieService:CookieService,private formBuilder: FormBuilder, private dialogRef: MatDialogRef<FuelAddComponent>,
    private modalService: BsModalService, private bulService: FuelConsumptionService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createAddFuelGroup();
  }


  createAddFuelGroup() {
    this.addFuelGroup = this.formBuilder.group({
      fuelType: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required],
      boughtDate: ['', Validators.required],
      ownerId : [this.cookieService.get("uid")]
    });
  }

  openModal(template: TemplateRef<any>) {
    if (!this.addFuelGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }


  confirm(): void {
    this.addNewBull();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addNewBull() {
    if (!this.addFuelGroup.valid) return;

    let fuelModel: FuelConsumption = { ...this.addFuelGroup.value };

    this.bulService.addFuel(fuelModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.dialogRef.close();
  
    }, responseError => {
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
