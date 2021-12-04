import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Cow } from 'src/app/models/cow';
import { CowsService } from 'src/app/services/cows.service';

@Component({
  selector: 'app-cow-update',
  templateUrl: './cow-update.component.html',
  styleUrls: ['./cow-update.component.css']
})
export class CowUpdateComponent implements OnInit {
  cows: Cow[] = [];
  updateCowGroup: FormGroup;
  modalRef: BsModalRef;
  property = this.cows[0];
  constructor(private cookieService: CookieService, private cowService: CowsService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllCows();
    this.createDeleteCowForm();
  }

  openModal(template: TemplateRef<any>) {
    if (!this.updateCowGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  createDeleteCowForm() {
    this.updateCowGroup = this.formBuilder.group({
      id: [''],
      cowId: ['', Validators.required],
      cowName: ['',Validators.required],
      age: ['',Validators.required],
      weight: ['',Validators.required],
      dailyMilkAmount: ['',Validators.required],
      weeklyMilkAmount: ['',Validators.required],
      monthlyMilkAmount: ['',Validators.required],
      ownerId : [this.cookieService.get("uid")]
    });
  }

  confirm() {
    this.updateCow();
    this.modalRef.hide();

  }

  get cowId() {
    return this.updateCowGroup.get('cowId')
  };

  getAllCows() {
 

    this.cowService.getUserCows().subscribe((response) => {
      this.cows = response.data;
    })
  }

  updateCow() {
    let updateCowModel: Cow = { ...this.updateCowGroup.value };

    this.cowService.updateCow(updateCowModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
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

  reloadPage() {
    window.location.reload()
  }

  decline() {
    this.modalRef.hide();
  }

}
