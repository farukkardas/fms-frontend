import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Sheep } from 'src/app/models/sheep';
import { SheepsService } from 'src/app/services/sheeps.service';

@Component({
  selector: 'app-sheep-delete',
  templateUrl: './sheep-delete.component.html',
  styleUrls: ['./sheep-delete.component.css']
})
export class SheepDeleteComponent implements OnInit {
  modalRef: BsModalRef
  deleteSheepGroup: FormGroup;
  sheeps: Sheep[] = [];
  property = this.sheeps[0];
  constructor(private sheepsService: SheepsService, private formBuilder: FormBuilder, private toastrService: ToastrService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllSheeps();
    this.createDeleteForm();
  }

  createDeleteForm() {
    this.deleteSheepGroup = this.formBuilder.group({
      id: [''],
      sheepId: [''],
      age: [''],
      race: [''],
      weight: ['']
    });


  }

  getAllSheeps() {
    this.sheepsService.getAllSheeps().subscribe((response) => {
      this.sheeps = response.data;
    })
  }

  deleteSheeps() {
    let sheepModel: Sheep = { ...this.deleteSheepGroup.value }
    this.sheepsService.deleteSheep(sheepModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
      this.getAllSheeps();
    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  confirm() {
    this.deleteSheeps();
    this.modalRef.hide();
  }

  decline() {
    this.modalRef.hide();
  }


}
