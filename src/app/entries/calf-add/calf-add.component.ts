import { Component, OnInit, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Calf } from 'src/app/models/calf';
import { CalvesService } from 'src/app/services/calves.service';

@Component({
  selector: 'app-calf-add',
  templateUrl: './calf-add.component.html',
  styleUrls: ['./calf-add.component.css']
})
export class CalfAddComponent implements OnInit {
  modalRef: BsModalRef;
  addCalfGroup: FormGroup;

  constructor(private cookieService:CookieService,private formBuilder:FormBuilder,private dialogRef: MatDialogRef<CalfAddComponent>,private modalService:BsModalService,private calfService:CalvesService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createAddCalfGroup();
  }

  createAddCalfGroup() {
    this.addCalfGroup = this.formBuilder.group({
      calfId: ['',Validators.required],
      age: ['',Validators.required],
      gender: ['',Validators.required],
      calfName: ['',Validators.required],
      weight: ['',Validators.required],
      birthDate: ['',Validators.required],
      ownerId: [this.cookieService.get("uid")]
    });


  }

  openModal(template: TemplateRef<any>) {
    if (!this.addCalfGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  get calfId() { 
    return this.addCalfGroup.get('calfId') 
  };



  confirm(): void {
    this.addNewCalf();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

addNewCalf(){
  if (!this.addCalfGroup.valid) return;

  // take the value of cowgroup
  let calfModel: Calf = { ...this.addCalfGroup.value };

  //request to restapi
  this.calfService.addCalf(calfModel).subscribe((response) => {
    this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
    this.dialogRef.close();
  //  setTimeout(this.reloadPage, 2000)
  }, responseError=>{
    console.log(responseError)
    if(responseError.error.Errors.length>0){
      for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error", {positionClass : 'toast-bottom-right'}
          )
      }       
    } 
  })
}

}
