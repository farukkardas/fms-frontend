import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cargo-add-no',
  templateUrl: './cargo-add-no.component.html',
  styleUrls: ['./cargo-add-no.component.css']
})
export class CargoAddNoComponent implements OnInit {
  modalRef: BsModalRef;
  cargoGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: number,private modalService: BsModalService, private formBuilder: FormBuilder,private ordersService:OrdersService) { }

  ngOnInit(): void {
    this.createAddCargoForm()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }

  createAddCargoForm() {
    this.cargoGroup = this.formBuilder.group({
      order: [this.data],
      deliveryNo: [''],
    });
  }

  addCargoNo(){
 let orderId = this.cargoGroup.controls['order'].value;
 let deliveryNo = this.cargoGroup.controls['deliveryNo'].value;

 this.ordersService.addCargoNo(orderId,deliveryNo).subscribe((response)=>{
   console.log(response)
 },(responseError)=>{
   console.log(responseError)
 })
  }

  confirm(): void {
    this.addCargoNo();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

}
