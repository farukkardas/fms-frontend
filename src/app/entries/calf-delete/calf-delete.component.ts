import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Calf } from 'src/app/models/calf';
import { CalvesService } from 'src/app/services/calves.service';

@Component({
  selector: 'app-calf-delete',
  templateUrl: './calf-delete.component.html',
  styleUrls: ['./calf-delete.component.css']
})
export class CalfDeleteComponent implements OnInit {
  modalRef: BsModalRef;
  calves: Calf[] = [];
  deleteCalfGroup: FormGroup;
  property = this.calves[6];
  constructor(private modalService: BsModalService, private calvesServices: CalvesService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllCalves();
    this.createDeleteCalfForm();
  }

  getAllCalves() {
    this.calvesServices.getAllCalves().subscribe((response) => {
      this.calves = response.data;
    })
  }

  createDeleteCalfForm() {
    this.deleteCalfGroup = this.formBuilder.group({
      id: [''],
      calfId: ['',Validators.required],
      age: [''],
      gender: [''],
      calfName: [''],
      weight: [''],
      birthDate: ['']
    });


  }


  confirm(): void {
    this.deleteCalf();
    this.modalRef.hide();
  }

  deleteCalf() {
    let calfModel: Calf = { ...this.deleteCalfGroup.value }
    
    this.calvesServices.deleteCalf(calfModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
    this.getAllCalves();
    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }



  decline() {
    this.modalRef.hide();
  }

}
