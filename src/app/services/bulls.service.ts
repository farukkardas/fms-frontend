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
  apiUrl = "http://localhost:5000/api/";
  constructor(private httpClient: HttpClient) { }

  getAllBulls(): Observable<ListResponseModel<Bull>> {
    let getAllPath = this.apiUrl + "bull/getall";
    return this.httpClient.get<ListResponseModel<Bull>>(getAllPath);
  }

  addBull(bullModel: Bull): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "bull/add",bullModel);
  }

  updateBull(bullModel:Bull) : Observable<ResponseModel>  {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "bull/update", bullModel);
  }

  deleteBull(bullModel : Bull) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "bull/delete",bullModel);
  }

  getUserBulls(): Observable<ListResponseModel<Bull>> {
     let getAllPath = this.apiUrl + "bull/getuserbulls";
  
    return this.httpClient.get<ListResponseModel<Bull>>(getAllPath)

  }
}
