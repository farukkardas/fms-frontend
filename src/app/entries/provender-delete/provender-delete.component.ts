import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Provender } from 'src/app/models/provender';
import { ProvenderService } from 'src/app/services/provender.service';

@Component({
  selector: 'app-provender-delete',
  templateUrl: './provender-delete.component.html',
  styleUrls: ['./provender-delete.component.css']
})
export class ProvenderDeleteComponent implements OnInit {
  modalRef: BsModalRef;
  provenders: Provender[] = [];
  deleteProvenderGroup: FormGroup;
  property = this.provenders[6];
  constructor(private cookieService:CookieService,private modalService: BsModalService, private provenderService: ProvenderService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllProvenders();
    this.createDeleteProvenderGroup();
  }

  getAllProvenders() {
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.provenderService.getUserProvenders(userId,securitykey).subscribe((response) => {
      this.provenders = response.data;
    })
  }

  createDeleteProvenderGroup() {
    this.deleteProvenderGroup = this.formBuilder.group({
      id: [''],
      provenderName: [''],
      weight: [''],
      price: [''],
      boughtDate: [''],
      ownerId : [this.cookieService.get("uid")]
    });


  }


  confirm(): void {
    this.deleteCalf();
    this.modalRef.hide();
  }

  deleteCalf() {
    let provenderModel: Provender = { ...this.deleteProvenderGroup.value }
    
    this.provenderService.deleteProvender(provenderModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.getAllProvenders();
      this.deleteProvenderGroup.reset() 
      this.createDeleteProvenderGroup();
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
