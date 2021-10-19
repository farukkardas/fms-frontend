import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Provender } from 'src/app/models/provender';
import { ProvenderService } from 'src/app/services/provender.service';

@Component({
  selector: 'app-provender-delete',
  templateUrl: './provender-delete.component.html',
  styleUrls: ['./provender-delete.component.css']
})
export class ProvenderDeleteComponent implements OnInit {
  modalRef: BsModalRef;
  provenders: Provender[] = [];
  deleteProvenderGroup: FormGroup;
  property = this.provenders[6];
  constructor(private modalService: BsModalService, private provenderService: ProvenderService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllProvenders();
    this.createDeleteProvenderGroup();
  }

  getAllProvenders() {
    this.provenderService.getAll().subscribe((response) => {
      this.provenders = response.data;
    })
  }

  createDeleteProvenderGroup() {
    this.deleteProvenderGroup = this.formBuilder.group({
      id: [''],
      provenderName: ['',Validators.required],
      weight: [''],
      price: [''],
      boughtDate: ['']
    });


  }


  confirm(): void {
    this.deleteCalf();
    this.modalRef.hide();
  }

  deleteCalf() {
    let provenderModel: Provender = { ...this.deleteProvenderGroup.value }
    
    this.provenderService.deleteProvender(provenderModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
    this.getAllProvenders();
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
