import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Provender } from '../models/provender';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProvenderService {
  apiUrl: string = "http://localhost:45523/api/"
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<Provender>> {
    let allPath = this.apiUrl + "provender/getall";
    return this.httpClient.get<ListResponseModel<Provender>>(allPath);
  }

  addProvender(provender: Provender): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "provender/add", provender);
  }

  updateProvender(provender:Provender) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "provender/update",provender);
  }

  deleteProvender(provender:Provender) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "provender/delete",provender);
  }
}
