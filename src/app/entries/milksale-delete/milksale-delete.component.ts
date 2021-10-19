import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MilkSales } from 'src/app/models/milkSales';
import { MilkSalesDto } from 'src/app/models/milkSalesDto';
import { MilksalesService } from 'src/app/services/milksales.service';

@Component({
  selector: 'app-milksale-delete',
  templateUrl: './milksale-delete.component.html',
  styleUrls: ['./milksale-delete.component.css']
})
export class MilksaleDeleteComponent implements OnInit {

  modalRef: BsModalRef;
  milkSales: MilkSales[] = [];
  deleteSaleGroup: FormGroup;
  property = this.milkSales[0];
  constructor(private modalService: BsModalService, private milkSalesService: MilksalesService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllSales();
    this.createDeleteSaleForm();
  }

  getAllSales() {
    this.milkSalesService.getAll().subscribe((response) => {
      this.milkSales = response.data;
    })
  }

  createDeleteSaleForm() {
    this.deleteSaleGroup = this.formBuilder.group({
      id: [''],
      amount: [''],
      salePrice: [''],
      customerId: [''],
      boughtDate: ['']
    });


  }


  confirm(): void {
    this.deleteSale();
    this.modalRef.hide();
  }

  deleteSale() {
    let milkModel: MilkSales = { ...this.deleteSaleGroup.value }
    
    this.milkSalesService.deleteMilkSales(milkModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });
    this.getAllSales();
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
