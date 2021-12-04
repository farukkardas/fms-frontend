import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OrderDetailDto } from '../models/orderDetailDto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl = "http://localhost:5000/api/orders/";
  constructor(private httpClient: HttpClient) { }


  getUserOrders(): Observable<ListResponseModel<OrderDetailDto>> {
    let getAllPath = this.apiUrl + "getuserorders"
    return this.httpClient.get<ListResponseModel<OrderDetailDto>>(getAllPath)
  }
}
