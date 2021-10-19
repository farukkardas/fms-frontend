import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "http://localhost:45523/api/";
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<Customer>> {
    let getAllPath = this.apiUrl + "customer/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(getAllPath);
  }
  addCustomer(customer: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "customer/add", customer);
  }

  updateCustomer(customer:Customer) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "customer/update",customer);
  }

  deleteCustomer(customer:Customer) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "customer/delete",customer);
  }
}
