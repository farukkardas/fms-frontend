import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OrderDetailDto } from '../models/orderDetailDto';
import { ResponseModel } from '../models/responseModel';

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

  approveOrder(orderId:any) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "approveorder"
    var formData: any = new FormData();
    formData.append("order",orderId);
    return this.httpClient.put<ResponseModel>(getAllPath,formData);
  }


  addCargoNo(orderId:string,deliveryNo:string) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "addcargono"
    var formData = new FormData();
    formData.append('order', orderId)
    formData.append('deliveryNo',deliveryNo)
    return this.httpClient.put<ResponseModel>(getAllPath ,formData);
  }
}
