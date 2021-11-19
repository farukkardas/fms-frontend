import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Fertilizer } from 'src/app/models/fertilizer';
import { FertilizersService } from 'src/app/services/fertilizers.service';

@Component({
  selector: 'app-fertilizer-update',
  templateUrl: './fertilizer-update.component.html',
  styleUrls: ['./fertilizer-update.component.css']
})
export class FertilizerUpdateComponent implements OnInit {
  fertilizers: Fertilizer[] = [];
  modalRef: BsModalRef;
  updateFertilizerGroup: FormGroup;
  dtTrigger: Subject<any> = new Subject<any>();
  property = this.fertilizers[0];
  constructor(private cookieService:CookieService,private modalService: BsModalService, private formBuilder: FormBuilder, private fertilizerService: FertilizersService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllFertilizers();
    this.crateUpdateFertilizerForm();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    if (!this.updateFertilizerGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  crateUpdateFertilizerForm() {
    this.updateFertilizerGroup = this.formBuilder.group({
      id: [''],
      fertilizerType: ['',Validators.required],
      fertilizerBrand: ['',Validators.required],
      weight: ['',Validators.required],
      price: ['',Validators.required],
      boughtDate: ['',Validators.required],
      ownerId : [this.cookieService.get("uid")]
    });
  }

  confirm() {
    this.getAllFertilizers();
    this.modalRef.hide();

  }

  decline() {
    this.modalRef.hide();
  }

  get calfId() {
    return this.updateFertilizerGroup.get('calfId')
  };

  getAllFertilizers() {
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.fertilizerService.getUserFertilizers(userId,securitykey).subscribe((response) => {
      this.fertilizers = response.data;
    })
  }

  updateFertilizer() {
    let updateFertilizerModel: Fertilizer = { ...this.updateFertilizerGroup.value };

    this.fertilizerService.updateFertilizer(updateFertilizerModel).subscribe((response) => {
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


}
