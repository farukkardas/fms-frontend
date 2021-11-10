import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Calf } from 'src/app/models/calf';
import { CalvesService } from 'src/app/services/calves.service';

@Component({
  selector: 'app-calf-update',
  templateUrl: './calf-update.component.html',
  styleUrls: ['./calf-update.component.css']
})
export class CalfUpdateComponent implements OnInit , OnDestroy {
calves : Calf[] = [];
modalRef: BsModalRef;
updateCalfGroup:FormGroup;
dtTrigger: Subject<any> = new Subject<any>();
property = this.calves[6];
  constructor(private cookieService:CookieService,private modalService:BsModalService,private formBuilder:FormBuilder,private calvesServices:CalvesService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllCalves();
    this.createUpdateCalfForm();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    if (!this.updateCalfGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  createUpdateCalfForm() {
    this.updateCalfGroup = this.formBuilder.group({
      id: [''],
      calfId: ['',Validators.required],
      age: ['',Validators.required],
      gender: ['',Validators.required],
      calfName: ['',Validators.required],
      weight: ['',Validators.required],
      birthDate: ['',Validators.required],
      ownerId : [this.cookieService.get("uid")]
    });
  }

  confirm() {
    this.updateCalf();
    this.modalRef.hide();

  }

  decline() {
    this.modalRef.hide();
  }

  get calfId() {
    return this.updateCalfGroup.get('calfId')
  };

  getAllCalves() {
    this.calvesServices.getAllCalves().subscribe((response) => {
      this.calves = response.data;
    })
  }

  updateCalf() {
    let updateCowModel: Calf = { ...this.updateCalfGroup.value };

    this.calvesServices.updateCalf(updateCowModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

  reloadPage(delay:number) {
    setTimeout(()=>{
      window.location.reload(),2000
    })

  }

 
}
