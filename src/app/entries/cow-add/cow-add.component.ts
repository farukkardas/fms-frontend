import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Cow } from 'src/app/models/cow';
import { CowsService } from 'src/app/services/cows.service';

@Component({
  selector: 'app-cow-add',
  templateUrl: './cow-add.component.html',
  styleUrls: ['./cow-add.component.css']
})
export class CowAddComponent implements OnInit {
  modalRef: BsModalRef;
  addCowGroup: FormGroup;
  constructor(private cookieService:CookieService,
    private dialogRef: MatDialogRef<CowAddComponent>, private formBuilder: FormBuilder, private cowService: CowsService, private toastrService: ToastrService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.createAddCowForm();
  }



  createAddCowForm() {
    this.addCowGroup = this.formBuilder.group({
      cowId: ['',Validators.required],
      cowName: ['',Validators.required],
      age: ['',Validators.required],
      weight: ['',Validators.required],
      dailyMilkAmount: ['',Validators.required],
      weeklyMilkAmount: ['',Validators.required],
      monthlyMilkAmount: ['',Validators.required],
      ownerId: [this.cookieService.get("uid")]
    });


  }

  get cowId() { 
    return this.addCowGroup.get('cowId') 
  };


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  confirm(): void {
    this.addNewCow();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addNewCow(): void {

     if (!this.addCowGroup.valid) return;

    // take the value of cowgroup
    let cowModel: Cow = { ...this.addCowGroup.value };

    //request to restapi
    this.cowService.addCow(cowModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.dialogRef.close();
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


  close() {
    this.dialogRef.close();
  }
}
