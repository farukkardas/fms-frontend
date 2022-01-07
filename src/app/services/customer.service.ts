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
  apiUrl = "http://localhost:5000/api/customer/";
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<Customer>> {
    let getAllPath = this.apiUrl + "getcustomersummary";
    return this.httpClient.get<ListResponseModel<Customer>>(getAllPath);
  }
  addCustomer(customer: Customer): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(getAllPath, customer);
  }

  updateCustomer(customer:Customer) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(getAllPath,customer);
  }

  deleteCustomer(customer:Customer) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(getAllPath,customer);
  }

  getUserCustomer() : Observable<ListResponseModel<Customer>>{
    let getAllPath = this.apiUrl + "getusercustomers";
    return this.httpClient.get<ListResponseModel<Customer>>(getAllPath)
  }
}
