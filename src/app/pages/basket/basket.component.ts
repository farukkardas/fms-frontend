import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { BasketProduct } from 'src/app/models/basketProduct';
import { DeleteBasket } from 'src/app/models/deleteBasket';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketProducts: BasketProduct[] = []
  productsLink: string = "/buyproduct"
  constructor(private cookieService: CookieService, private toastrService: ToastrService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.basketService.getBasketProducts().subscribe((response) => {
      this.basketProducts = response.data
      console.log(this.basketProducts)
    })
  }

  addTax(price: number, taxValue: number): any {
    let summary = price += price / 100 * taxValue;
    return summary;
  }

  calculateRawPrice(products: BasketProduct[]): any {
    let rawPrice: number;
    let prices: any[] = []

    for (let i = 0; i < products.length; i++) {
      prices.push(products[i].productPrice)
    }

    rawPrice = prices.reduce((a, b) => a + b, 0)
    return rawPrice;
  }


  calculateTaxValue(products: BasketProduct[]): number {

    let rawValue = this.calculateRawPrice(products)
    let sumValue = rawValue + rawValue / 100 * 1
    return sumValue;
  }

  deleteBasket(id, productId) {

    let uid = this.cookieService.get("uid")
    if (uid == null) { this.toastrService.error("Please login again!", "Error", { positionClass: 'toast-bottom-right' }) }

    let product = new DeleteBasket()
    product.id = id;
    product.productId = productId;
    product.userId = uid;

     this.basketService.deleteToBasket(product).subscribe(response=>{
      this.toastrService.success(response.message,"Success",{positionClass:'toast-bottom-right'})
      this.getProducts()
     },(responseError)=>{
      this.toastrService.error(responseError.message,"Error",{positionClass:'toast-bottom-right'})
     })
  }
}
