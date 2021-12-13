import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsonsaleService } from 'src/app/services/productsonsale.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  routeSub: Subscription;

  productName: string;
  price: number;
  imagePath:string;
  description : string;
  firstName : string;
  lastName : string;
  phoneNumber : string;
  constructor(private route: ActivatedRoute, private productSaleService: ProductsonsaleService) { }

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
    })

  }
}
