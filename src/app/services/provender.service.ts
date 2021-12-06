import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Provender } from '../models/provender';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProvenderService {
  apiUrl: string = "http://localhost:5000/api/provender/"
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<Provender>> {
    let allPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Provender>>(allPath);
  }

  addProvender(provender: Provender): Observable<ResponseModel> {
    let allPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(allPath, provender);
  }

  updateProvender(provender:Provender) : Observable<ResponseModel> {
    let allPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(allPath,provender);
  }

  deleteProvender(provender:Provender) : Observable<ResponseModel> {
    let allPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(allPath,provender);
  }

  getUserProvenders() : Observable<ListResponseModel<Provender>>{
    let getAllPath = this.apiUrl + "getuserprovenders";
    return this.httpClient.get<ListResponseModel<Provender>>(getAllPath)
  }
}
