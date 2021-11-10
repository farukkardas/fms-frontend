import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Bull } from 'src/app/models/bull';
import { BullsService } from 'src/app/services/bulls.service';

@Component({
  selector: 'app-bull-add',
  templateUrl: './bull-add.component.html',
  styleUrls: ['./bull-add.component.css']
})
export class BullAddComponent implements OnInit {

  modalRef: BsModalRef;
  addBullGroup: FormGroup;

  constructor(private cookieService:CookieService,private formBuilder: FormBuilder, private dialogRef: MatDialogRef<BullAddComponent>, private modalService: BsModalService, private bulService: BullsService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createAddBullGroup();
  }


  createAddBullGroup() {
    this.addBullGroup = this.formBuilder.group({
      bullId: ['', Validators.required],
      age: [''],
      bullName: [''],
      weight: [''],
      ownerId: [this.cookieService.get("uid")]
    });
  }

  openModal(template: TemplateRef<any>) {
    if (!this.addBullGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  get bullId() {
    return this.addBullGroup.get('bullId')
  };

  confirm(): void {
    this.addNewBull();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addNewBull() {
    if (!this.addBullGroup.valid) return;

    let bullModel: Bull = { ...this.addBullGroup.value };

    this.bulService.addBull(bullModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.dialogRef.close();
    }, responseError => {
      console.log(this.addBullGroup)
      console.log(responseError)
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error", { positionClass: 'toast-bottom-right' }
          )
        }
      }
    })
  }


}
