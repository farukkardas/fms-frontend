import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FuelConsumption } from 'src/app/models/fuelConsumption';
import { FuelConsumptionService } from 'src/app/services/fuelconsumption.service';

@Component({
  selector: 'app-fuel-update',
  templateUrl: './fuel-update.component.html',
  styleUrls: ['./fuel-update.component.css']
})
export class FuelUpdateComponent implements OnInit {
  fuels: FuelConsumption[] = [];
  modalRef: BsModalRef;
  updateFuelGroup: FormGroup;
  property = this.fuels[0];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private fuelConsumptionService: FuelConsumptionService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllFuels();
    this.createUpdateBullForm();
  }

  confirm() {
    this.updateBull();
    this.modalRef.hide();

  }

  decline() {
    this.modalRef.hide();
  }


  getAllFuels() {
    this.fuelConsumptionService.getAll().subscribe((response) => {
      this.fuels = response.data;
    })
  }

  createUpdateBullForm() {
    this.updateFuelGroup = this.formBuilder.group({
      id: [''],
      fuelType: ['', Validators.required],
      amount: [''],
      price: [''],
      boughtDate: ['']
    });
  }




  openModal(template: TemplateRef<any>) {
    if (!this.updateFuelGroup.valid) { return }

    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }



  updateBull() {
    let updateFuel: FuelConsumption = { ...this.updateFuelGroup.value };

    this.fuelConsumptionService.updateFuel(updateFuel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });

      //After success load bulls again (Temporary, needs to be async)
      this.getAllFuels();

    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

}
