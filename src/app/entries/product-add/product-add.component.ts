import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ProductsonsaleService } from 'src/app/services/productsonsale.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProductGroup: FormGroup;
  modalRef: BsModalRef;

  constructor(private cookieService:CookieService,private productOnSaleService:ProductsonsaleService,private modalService: BsModalService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createAddProductGroup()
  }

  createAddProductGroup() {
    this.addProductGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: [''],
      sellerId : [this.cookieService.get("uid")],
      file: [''],
      userId: [this.cookieService.get("uid")]
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addProductGroup.get('file').setValue(file);
    }
  }

  openModal(template: TemplateRef<any>) {
    if (!this.addProductGroup.valid) { return }
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' })
  }


  confirm(): void {
    this.addProduct();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  addProduct() {

    let productModel = { ...this.addProductGroup.value}

    let file = this.addProductGroup.get("file").value;
    let userId = this.addProductGroup.get("userId").value;

    this.productOnSaleService.addProduct(productModel,file,userId).subscribe((response)=>{
      this.toastrService.success(response.message,"Success",{positionClass:'toast-bottom-right'})
    },(responseError)=>{
      this.toastrService.error("Invalid image type! Only accepts JPEG,PNG,BMP!", "Error", { positionClass: 'toast-bottom-right' });
    })

   console.log(this.addProductGroup.value)
  }


}
