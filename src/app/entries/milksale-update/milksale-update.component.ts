import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { MilkSales } from 'src/app/models/milkSales';
import { CustomerService } from 'src/app/services/customer.service';
import { MilksalesService } from 'src/app/services/milksales.service';

@Component({
  selector: 'app-milksale-update',
  templateUrl: './milksale-update.component.html',
  styleUrls: ['./milksale-update.component.css']
})
export class MilksaleUpdateComponent implements OnInit {
  milkSales: MilkSales[] = [];
  customers:Customer[] = [];
  modalRef: BsModalRef;
  updateMilkSaleGroup: FormGroup;
  property = this.milkSales[0];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private customerService:CustomerService,private milkSaleService: MilksalesService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllSales();
    this.getAllCustomers();
    this.createUpdateSalesForm();
  }

  getAllCustomers(){
    this.customerService.getAll().subscribe((response)=>{
      this.customers = response.data
    },(responseError)=>{
      responseError.message
    })
  }


  confirm() {
    this.updateSales();
    this.modalRef.hide();

  }

  decline() {
    this.modalRef.hide();
  }

  get customerId() {
    return this.updateMilkSaleGroup.get('id')
  };

  getAllSales() {
    this.milkSaleService.getAll().subscribe((response) => {
      this.milkSales = response.data;
    })
  }

  createUpdateSalesForm() {
    this.updateMilkSaleGroup = this.formBuilder.group({
      id: [''],
      amount: [''],
      salePrice: [''],
      customerId: [''],
      boughtDate: ['']
    });
  }




  openModal(template: TemplateRef<any>) {
    if (!this.updateMilkSaleGroup.valid) { return }

    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }



  updateSales() {
    let updateMilkSalesModel: MilkSales = { ...this.updateMilkSaleGroup.value };

    this.milkSaleService.updateMilkSales(updateMilkSalesModel).subscribe((response) => {
      this.toastrService.success(response.message, "Succes", { positionClass: 'toast-bottom-right' });

      //After success load  again (Temporary, needs to be async)
      this.getAllSales();

    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' });
    })
  }

}
