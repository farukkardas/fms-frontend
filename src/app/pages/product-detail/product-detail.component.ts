import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AddBasketProducts } from 'src/app/models/addBasketProduct';
import { BasketService } from 'src/app/services/basket.service';
import { ProductsonsaleService } from 'src/app/services/productsonsale.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  routeSub: Subscription;

  id: number;
  productName: string;
  price: number;
  imagePath: string;
  description: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  constructor(private cookieService: CookieService, private basketService: BasketService, private toastrService: ToastrService, private route: ActivatedRoute, private productSaleService: ProductsonsaleService) { }

  ngOnInit(): void {
    this.getProductDetail()
  }

  getProductDetail() {
    let productId;

    this.routeSub = this.route.params.subscribe(params => {
      productId = params['id']
    });

    this.productSaleService.getProductDetails(productId).subscribe((response) => {
      this.price = response.data.price
      this.productName = response.data.name
      this.imagePath = response.data.imagePath
      this.description = response.data.description
      this.firstName = response.data.sellerName
      this.lastName = response.data.sellerLastName
      this.phoneNumber = response.data.phoneNumber
      this.id = response.data.id;
    })

  }


  addProductToBasket(pId) {
    let uid = this.cookieService.get("uid")
    if (uid == null) { this.toastrService.error("Please login again!", "Error", { positionClass: 'toast-bottom-right' }) }

    let product = new AddBasketProducts()
    product.userId = uid
    product.productId = pId

    this.basketService.addToBasket(product).subscribe((response) => {
      this.toastrService.success(response.message, "Success", { positionClass: 'toast-bottom-right' })
    }, (responseError) => {
      this.toastrService.error(responseError.message, "Error", { positionClass: 'toast-bottom-right' })
    })
  }
}
