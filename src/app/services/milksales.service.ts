import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { MilkSales } from '../models/milkSales';
import { MilkSalesDto } from '../models/milkSalesDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MilksalesService {
  apiUrl = "http://localhost:5000/api/milksales/";
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<MilkSales>> {
    let getAllPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<MilkSales>>(getAllPath);
  }

  getMilkSales() :Observable<ListResponseModel<MilkSalesDto>>{
    let getAllPath = this.apiUrl + "getmilksales";
    return this.httpClient.get<ListResponseModel<MilkSalesDto>>(getAllPath);
  }
  addMilkSales(milkSales: MilkSales): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(getAllPath, milkSales);
  }

  updateMilkSales(milkSales:MilkSales) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(getAllPath,milkSales);
  }

  deleteMilkSales(milkSales:MilkSales) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(getAllPath,milkSales);
  }

  getUserMilkSales() : Observable<ListResponseModel<MilkSalesDto>>{
    let getAllPath = this.apiUrl + "getusermilksales";
    return this.httpClient.get<ListResponseModel<MilkSalesDto>>(getAllPath)
  }

}
