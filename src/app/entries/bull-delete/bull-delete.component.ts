import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Bull } from 'src/app/models/bull';
import { BullsService } from 'src/app/services/bulls.service';

@Component({
  selector: 'app-bull-delete',
  templateUrl: './bull-delete.component.html',
  styleUrls: ['./bull-delete.component.css']
})
export class BullDeleteComponent implements OnInit {
  modalRef: BsModalRef
  deleteBullGroup: FormGroup;
  bulls: Bull[] = [];
  property = this.bulls[0];
  id : number;
  constructor(private cookieService:CookieService,private bullsService: BullsService, private formBuilder: FormBuilder, private toastrService: ToastrService, private modalService: BsModalService) { }


  ngOnInit(): void {
    this.getAllBulls();
    this.createDeleteForm();
  }

  createDeleteForm() {
    this.deleteBullGroup = this.formBuilder.group({
      id: [''],
      bullId: [''],
      age: [''],
      bullName: [''],
      weight: [''],
      ownerId: [this.cookieService.get("uid")]
    });


  }

  getAllBulls() {
    this.bullsService.getUserBulls().subscribe((response) => {
      this.bulls = response.data;
    })
  }



  deleteCow() {
    let bullModel: Bull = { ...this.deleteBullGroup.value }
    this.bullsService.deleteBull(bullModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.getAllBulls();
      this.deleteBullGroup.reset() 
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
