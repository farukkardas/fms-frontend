import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bull } from '../models/bull';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BullsService {
  apiUrl = "http://localhost:5000/api/bull/";
  constructor(private httpClient: HttpClient) { }

  getAllBulls(): Observable<ListResponseModel<Bull>> {
    let getAllPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Bull>>(getAllPath);
  }

  addBull(bullModel: Bull): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(getAllPath,bullModel);
  }

  updateBull(bullModel:Bull) : Observable<ResponseModel>  {
    let getAllPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(getAllPath, bullModel);
  }

  deleteBull(bullModel : Bull) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(getAllPath,bullModel);
  }

  getUserBulls(): Observable<ListResponseModel<Bull>> {
     let getAllPath = this.apiUrl + "getuserbulls";
    return this.httpClient.get<ListResponseModel<Bull>>(getAllPath)
  }
}
