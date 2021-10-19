import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Bull } from 'src/app/models/bull';
import { Fertilizer } from 'src/app/models/fertilizer';
import { BullsService } from 'src/app/services/bulls.service';
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
  constructor(private fertilizerService: FertilizersService, private formBuilder: FormBuilder, private toastrService: ToastrService, private modalService: BsModalService) { }


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
    this.fertilizerService.getAll().subscribe((response) => {
      this.fertilizers = response.data;
    })
  }

  deleteCow() {
    let fertilizerModel: Fertilizer = { ...this.fertilizerGroup.value }
    this.fertilizerService.deleteProvender(fertilizerModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.getAllFertilizers();
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
