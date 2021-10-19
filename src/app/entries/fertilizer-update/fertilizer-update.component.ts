import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private fertilizerService: FertilizersService, private toastrService: ToastrService) { }

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
      fertilizerBrand: [''],
      weight: [''],
      price: [''],
      boughtDate: ['']
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
    this.fertilizerService.getAll().subscribe((response) => {
      this.fertilizers = response.data;
    })
  }

  updateFertilizer() {
    let updateFertilizerModel: Fertilizer = { ...this.updateFertilizerGroup.value };

    this.fertilizerService.updateFertilizer(updateFertilizerModel).subscribe((response) => {
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
