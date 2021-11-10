import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Fertilizer } from 'src/app/models/fertilizer';
import { FertilizersService } from 'src/app/services/fertilizers.service';

@Component({
  selector: 'app-fertilizer-delete',
  templateUrl: './fertilizer-delete.component.html',
  styleUrls: ['./fertilizer-delete.component.css']
})
export class FertilizerDeleteComponent implements OnInit {

  modalRef: BsModalRef;
  fertilizerGroup: FormGroup;
  fertilizers: Fertilizer[] = [];
  property = this.fertilizers[0];
  constructor(private cookieService:CookieService,private fertilizerService: FertilizersService, private formBuilder: FormBuilder, private toastrService: ToastrService, private modalService: BsModalService) { }


  ngOnInit(): void {
    this.getAllFertilizers();
    this.createDeleteForm();
  }

  createDeleteForm() {
    this.fertilizerGroup = this.formBuilder.group({
      id: [''],
      fertilizerType: [''],
      fertilizerBrand: [''],
      weight: [''],
      price: [''],
      boughtDate: ['']
    });


  }

  getAllFertilizers() {
    
    let userId, securitykey;

    userId = this.cookieService.get("uid")
    securitykey = this.cookieService.get("sk")

    this.fertilizerService.getUserFertilizers(userId,securitykey).subscribe((response) => {
      this.fertilizers = response.data;
    })
  }

  deleteCow() {
    let fertilizerModel: Fertilizer = { ...this.fertilizerGroup.value }
    this.fertilizerService.deleteProvender(fertilizerModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.getAllFertilizers();
      this.fertilizerGroup.reset() 
      this.createDeleteForm();
    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  confirm() {
    this.deleteCow();
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }

}
