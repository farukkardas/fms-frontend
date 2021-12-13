import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBasketProducts } from '../models/addBasketProduct';
import { BasketProduct } from '../models/basketProduct';
import { DeleteBasket } from '../models/deleteBasket';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  apiUrl = "http://localhost:5000/api/basket/";
  constructor(private httpClient: HttpClient) { }

  getBasketProducts(): Observable<ListResponseModel<BasketProduct>> {
    let getAllPath = this.apiUrl + "getbasketproducts"
    return this.httpClient.get<ListResponseModel<BasketProduct>>(getAllPath);
  }

  addToBasket(product: AddBasketProducts): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "addtobasket"
    return this.httpClient.post<ResponseModel>(getAllPath, product)
  }

  deleteToBasket(product: DeleteBasket): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "deletetobasket"
    return this.httpClient.post<ResponseModel>(getAllPath, product)
  }
}
