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
    let getAllPath = this.apiUrl + "approveorder?order="
    let setParams = new HttpParams();
    setParams.set("order",orderId)
    return this.httpClient.put<ResponseModel>(getAllPath + orderId,{params:setParams});
  }


  addCargoNo(orderId:number,deliveryNo:number) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "addcargono?order="
    const httpParams = new HttpParams();
    httpParams.append('order', orderId)
    httpParams.append('deliveryNo',deliveryNo)
    return this.httpClient.put<ResponseModel>(getAllPath + orderId + "&" + "deliveryNo="+deliveryNo,{params:httpParams});
  }
}
