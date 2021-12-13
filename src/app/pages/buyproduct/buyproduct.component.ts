import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AddBasketProducts } from 'src/app/models/addBasketProduct';
import { Product } from 'src/app/models/product';
import { BasketService } from 'src/app/services/basket.service';
import { ProductsonsaleService } from 'src/app/services/productsonsale.service';

@Component({
  selector: 'app-buyproduct',
  templateUrl: './buyproduct.component.html',
  styleUrls: ['./buyproduct.component.css'],


})
export class BuyproductComponent implements OnInit {
  products: Product[] = []
  p: number = 1;
  pageSize: number = 6;
  detailPage = "/product-detail/"
  constructor(private toastrService: ToastrService, private cookieService: CookieService, private router: Router, private productsOnSaleService: ProductsonsaleService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  handlePageChange(event) {
    this.p = event;
  }

  getAllProducts() {
    this.productsOnSaleService.getAllProducts().subscribe((response) => {
      this.products = response.data
      console.log(this.products.length)
    })

  }

  routeProductDetail(id: string) {
    this.router.navigate([this.detailPage, id])
  }

  addProductToBasket(pId) {
    let uid = this.cookieService.get("uid")
    if (uid == null) { this.toastrService.error("Please login again!", "Error", { positionClass: 'toast-bottom-right' }) }

    let product = new AddBasketProducts()
    product.userId = uid
    product.productId = pId

    this.basketService.addToBasket(product).subscribe((response)=>{
      this.toastrService.success(response.message,"Success",{positionClass:'toast-bottom-right'})
    },(responseError)=>{
      this.toastrService.error(responseError.message,"Error",{positionClass:'toast-bottom-right'})
    })
  }

}
