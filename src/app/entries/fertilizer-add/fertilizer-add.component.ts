import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Fertilizer } from 'src/app/models/fertilizer';
import { FertilizersService } from 'src/app/services/fertilizers.service';

@Component({
  selector: 'app-fertilizer-add',
  templateUrl: './fertilizer-add.component.html',
  styleUrls: ['./fertilizer-add.component.css']
})
export class FertilizerAddComponent implements OnInit {
  modalRef: BsModalRef;
  addFertilizerGroup: FormGroup;
  constructor(private cookieService:CookieService,
    private dialogRef: MatDialogRef<FertilizerAddComponent>, private formBuilder: FormBuilder, private fertilizerService: FertilizersService, private toastrService: ToastrService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.createAddFertilizerForm();
  }



  createAddFertilizerForm() {
    this.addFertilizerGroup = this.formBuilder.group({
      fertilizerType: ['',Validators.required],
      fertilizerBrand: ['',Validators.required],
      weight: ['',Validators.required],
      price: ['',Validators.required],
      boughtDate: ['',Validators.required],
      ownerId : [this.cookieService.get("uid")]
    });


  }



  openModal(template: TemplateRef<any>) {
    if (!this.addFertilizerGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  confirm(): void {
    this.addNewFertilizer();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addNewFertilizer(): void {

     if (!this.addFertilizerGroup.valid) return;

    // take the value of cowgroup
    let fertilizerGroup: Fertilizer = { ...this.addFertilizerGroup.value };

    //request to api
    this.fertilizerService.addFertilizer(fertilizerGroup).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.dialogRef.close();
    }, responseError=>{
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

  close() {
    this.dialogRef.close();
  }

}
