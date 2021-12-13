import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ProductDetail } from '../models/productDetail';
import { ProductsOnSale } from '../models/productsOnSale';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsonsaleService {
  apiUrl = "http://localhost:5000/api/productsonsale/";

  constructor(private httpClient: HttpClient) { }


  addProduct(productsonsale: ProductsOnSale, file: File, userId: string): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "addproduct";

    const headers = new HttpHeaders();
    headers.append('Content-Type', null);
    headers.append('Accept', 'application/json');

    const formData: FormData = new FormData();


    Object.keys(productsonsale).forEach(key => formData.append(key, productsonsale[key]));
    formData.append('file', file);
    formData.append('userId', userId);


    return this.httpClient.post<ResponseModel>(getAllPath, formData, { headers: headers })
  }

  getAllProducts(): Observable<ListResponseModel<Product>> {
    let getAllPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Product>>(getAllPath)
  }

  deleteProduct(productId: string): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "deleteproduct";

    const formData = new FormData();
    formData.append("productId", productId);

    return this.httpClient.post<ResponseModel>(getAllPath, formData)
  }

  getUserProducts(): Observable<ListResponseModel<ProductsOnSale>> {
    let getAllPath = this.apiUrl + "getuserproducts";

    return this.httpClient.get<ListResponseModel<ProductsOnSale>>(getAllPath)
  }

  getProductDetails(id: number): Observable<SingleResponseModel<ProductDetail>> {
    let getAllPath = this.apiUrl + "getbyid?id=" + id;

    return this.httpClient.get<SingleResponseModel<ProductDetail>>(getAllPath)
  }
}
