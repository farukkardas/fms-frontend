import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Cow } from 'src/app/models/cow';
import { CowsService } from 'src/app/services/cows.service';

@Component({
  selector: 'app-cow-delete',
  templateUrl: './cow-delete.component.html',
  styleUrls: ['./cow-delete.component.css']
})
export class CowDeleteComponent implements OnInit {
  cows: Cow[] = [];
  deleteCowGroup : FormGroup;
  modalRef: BsModalRef;
  property = this.cows[0];
  constructor(private cookieService:CookieService,private cowService: CowsService,private formBuilder:FormBuilder,private toastrService:ToastrService, private dialogRef: MatDialogRef<CowDeleteComponent>,private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getAllCows();
    this.createDeleteCowForm();
  }

  createDeleteCowForm() {
    this.deleteCowGroup = this.formBuilder.group({
      id : [''],
      cowId: [''],
      cowName: [''],
      age: [''],
      weight: [''],
      dailyMilkAmount: [''],
      weeklyMilkAmount: [''],
      monthlyMilkAmount: ['']
    });


  }

  getAllCows() {
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.cowService.getUserCows(userId, securitykey).subscribe((response) => {
      this.cows = response.data;
    })
  }

  deleteCow(){
    let cowModel : Cow = {...this.deleteCowGroup.value}
    this.cowService.deleteCow(cowModel).subscribe((response)=>{
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.getAllCows();
      this.deleteCowGroup.reset() 
      this.createDeleteCowForm();
    },(responseError)=>{
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

  openModal(template: TemplateRef<any>) {
   
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  confirm(){
    this.deleteCow();
    this.modalRef.hide()
  }

  decline(){
    this.modalRef.hide();
  }


}
