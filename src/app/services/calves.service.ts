import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calf } from '../models/calf';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CalvesService {
  apiUrl = "http://localhost:5000/api/calves/";
  constructor(private httpClient: HttpClient) { }

  getAllCalves(): Observable<ListResponseModel<Calf>> {
    let getAllPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Calf>>(getAllPath);
  }

  addCalf(calfModel: Calf): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(
      getAllPath, calfModel
    );
  }

  deleteCalf(calfModel: Calf): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(
      getAllPath, calfModel
    );
  }

  updateCalf(calfModel: Calf): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(getAllPath, calfModel);
  }

  getUserCalves(id: number, securityKey: string): Observable<ListResponseModel<Calf>> {
    let getAllPath = this.apiUrl + "getusercalves";
    return this.httpClient.get<ListResponseModel<Calf>>(getAllPath)

  }


}
