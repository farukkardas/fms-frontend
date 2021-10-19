import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Provender } from 'src/app/models/provender';
import { ProvenderService } from 'src/app/services/provender.service';

@Component({
  selector: 'app-provender-add',
  templateUrl: './provender-add.component.html',
  styleUrls: ['./provender-add.component.css']
})
export class ProvenderAddComponent implements OnInit {
  modalRef: BsModalRef;
  addProvenderGroup: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<ProvenderAddComponent>, private formBuilder: FormBuilder, private provenderService: ProvenderService, private toastrService: ToastrService, private modalService: BsModalService) {
  }


  ngOnInit(): void {
    this.createAddProvenderForm();
  }

  createAddProvenderForm() : void {
    this.addProvenderGroup = this.formBuilder.group({
      provenderName: ['', Validators.required],
      weight: [''],
      price: [''],
      boughtDate: ['']
    });
  }


  openModal(template: TemplateRef<any>) {
    if (!this.addProvenderGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  confirm(): void {
    this.addNewProvender();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addNewProvender():void{


    if (!this.addProvenderGroup.valid) return;

    // take the value of cowgroup
    let provenderModel: Provender = { ...this.addProvenderGroup.value };

    //request to api
    this.provenderService.addProvender(provenderModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.dialogRef.close();
      setTimeout(this.reloadPage, 2000)
    }, responseError=>{
      console.log(responseError)
      if(responseError.error.errors.length>0){
        for (let i = 0; i <responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i]
            )
        }       
      } 
    })
  }

  reloadPage() {
    window.location.reload()
  }

  close() {
    this.dialogRef.close();
  }

}
