import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fertilizer } from '../models/fertilizer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FertilizersService {

  apiUrl: string = "http://localhost:5000/api/fertilizer/"
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<Fertilizer>> {
    let allPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Fertilizer>>(allPath);
  }

  addFertilizer(fertilizer: Fertilizer): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "add";

    return this.httpClient.post<ResponseModel>(getAllPath, fertilizer);
  }

  updateFertilizer(fertilizer:Fertilizer) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(getAllPath,fertilizer);
  }

  deleteProvender(fertilizer:Fertilizer) : Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(getAllPath,fertilizer);
  }
  
  getUserFertilizers(id:number,securityKey:string) : Observable<ListResponseModel<Fertilizer>> {
    let getAllPath = this.apiUrl + "getuserfertilizers";

    return this.httpClient.get<ListResponseModel<Fertilizer>>(getAllPath)
  }
}
