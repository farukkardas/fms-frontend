import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Sheep } from 'src/app/models/sheep';
import { SheepsService } from 'src/app/services/sheeps.service';

@Component({
  selector: 'app-sheep-add',
  templateUrl: './sheep-add.component.html',
  styleUrls: ['./sheep-add.component.css']
})
export class SheepAddComponent implements OnInit {
  addSheepGroup: FormGroup;
  modalRef:BsModalRef;
  constructor(private cookieService:CookieService,private dialogRef: MatDialogRef<SheepAddComponent>,private sheepsService: SheepsService,private formBuilder: FormBuilder,private modalService:BsModalService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createAddSheepGroup();
  }

  createAddSheepGroup() {
    this.addSheepGroup = this.formBuilder.group({
      sheepId: ['', Validators.required],
      age: ['', Validators.required],
      race: ['', Validators.required],
      weight: ['', Validators.required],
      ownerId: [this.cookieService.get("uid")]
    });
  }

  openModal(template: TemplateRef<any>) {
    if (!this.addSheepGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  get sheepId() {
    return this.addSheepGroup.get('sheepId')
  };

  confirm(): void {
    this.addNewSheep();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addNewSheep() {
    if (!this.addSheepGroup.valid) return;

    let sheepModel: Sheep = { ...this.addSheepGroup.value };

    this.sheepsService.addSheep(sheepModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.dialogRef.close();
    }, responseError => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error", { positionClass: 'toast-bottom-right' }
          )
        }
      }
    })
  }

}
