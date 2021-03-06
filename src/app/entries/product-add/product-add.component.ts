import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UploadImage } from 'src/app/models/uploadImage';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductsonsaleService } from 'src/app/services/productsonsale.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProductGroup: FormGroup;
  modalRef: BsModalRef;
  uploadImageModel: UploadImage;
  imageFile: File;
  constructor(private productsComponent: ProductsComponent, private cookieService: CookieService, private productOnSaleService: ProductsonsaleService, private modalService: BsModalService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createAddProductGroup()
  }

  createAddProductGroup() {
    this.addProductGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: [''],
      categoryId: [''],
      description: [''],
      sellerId: [this.cookieService.get("uid")],
      userId: [this.cookieService.get("uid")]
    });
  }

  upload(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageFile = file;
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

    let productModel = { ...this.addProductGroup.value }
    this.uploadImageModel = new UploadImage;

    this.uploadImageModel.file = this.imageFile;

    this.productOnSaleService.addProduct(productModel, this.uploadImageModel).subscribe((response) => {
      this.toastrService.success(response.message, "Success", { positionClass: 'toast-bottom-right' })
      this.productsComponent.hideModal()
    }, (responseError) => {
      console.log(responseError)
      if (responseError.error.errors.length > 0) {
        for (let i = 0; i < responseError.error.errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Error", { positionClass: 'toast-bottom-right' }
          )
        }
      }
    })

  }


}
