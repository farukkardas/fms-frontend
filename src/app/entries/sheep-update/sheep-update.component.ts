import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Sheep } from 'src/app/models/sheep';
import { SheepsService } from 'src/app/services/sheeps.service';

@Component({
  selector: 'app-sheep-update',
  templateUrl: './sheep-update.component.html',
  styleUrls: ['./sheep-update.component.css']
})
export class SheepUpdateComponent implements OnInit {
  sheeps: Sheep[] = [];
  modalRef: BsModalRef;
  updateSheepGroup: FormGroup;
  property = this.sheeps[0];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private cookieService:CookieService,private sheepsService:SheepsService,private formBuilder:FormBuilder,private modalService:BsModalService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllSheeps();
    this.createUpdateSheepForm();
  }



  confirm() {
    this.updateBull();
    this.modalRef.hide();

  }

  decline() {
    this.modalRef.hide();
  }

  get bullId() {
    return this.updateSheepGroup.get('sheepId')
  };

  getAllSheeps() {
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")
    this.sheepsService.getUserSheeps(userId,securitykey).subscribe((response) => {
      this.sheeps = response.data;
    })
  }

  createUpdateSheepForm() {
    this.updateSheepGroup = this.formBuilder.group({
      id: [''],
      sheepId: ['', Validators.required],
      age: ['', Validators.required],
      race: ['', Validators.required],
      weight: ['', Validators.required],
      ownerId : [this.cookieService.get("uid")]
    });
  }




  openModal(template: TemplateRef<any>) {
    if (!this.updateSheepGroup.valid) { return }

    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }



  updateBull() {
    let updateSheepModel: Sheep = { ...this.updateSheepGroup.value };

    this.sheepsService.updateSheep(updateSheepModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });

      this.getAllSheeps();

    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

}
