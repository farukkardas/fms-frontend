import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { MilkSales } from '../models/milkSales';
import { MilkSalesDto } from '../models/milkSalesDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MilksalesService {
  apiUrl = "http://localhost:5000/api/";
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<MilkSales>> {
    let getAllPath = this.apiUrl + "milksales/getall";
    return this.httpClient.get<ListResponseModel<MilkSales>>(getAllPath);
  }

  getMilkSales() :Observable<ListResponseModel<MilkSalesDto>>{
    let getAllPath = this.apiUrl + "milksales/getmilksales";
    return this.httpClient.get<ListResponseModel<MilkSalesDto>>(getAllPath);
  }
  addMilkSales(milkSales: MilkSales): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "milksales/add", milkSales);
  }

  updateMilkSales(milkSales:MilkSales) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "milksales/update",milkSales);
  }

  deleteMilkSales(milkSales:MilkSales) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "milksales/delete",milkSales);
  }

  getUserMilkSales(id:number,securityKey:string) : Observable<ListResponseModel<MilkSalesDto>>{
    let getAllPath = this.apiUrl + "milksales/getusermilksales";
    let parameters = new HttpParams().set('id', id).set('securitykey', securityKey)

    return this.httpClient.get<ListResponseModel<MilkSalesDto>>(getAllPath, { params: parameters })
  }

}
