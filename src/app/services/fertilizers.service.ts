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

  apiUrl: string = "http://localhost:5000/api/"
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<Fertilizer>> {
    let allPath = this.apiUrl + "fertilizer/getall";
    return this.httpClient.get<ListResponseModel<Fertilizer>>(allPath);
  }

  addFertilizer(fertilizer: Fertilizer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "fertilizer/add", fertilizer);
  }

  updateFertilizer(fertilizer:Fertilizer) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "fertilizer/update",fertilizer);
  }

  deleteProvender(fertilizer:Fertilizer) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "fertilizer/delete",fertilizer);
  }
  
  getUserFertilizers(id:number,securityKey:string) : Observable<ListResponseModel<Fertilizer>> {
    let getAllPath = this.apiUrl + "fertilizer/getuserfertilizers";
    let parameters = new HttpParams().set('id', id).set('securitykey', securityKey)

    return this.httpClient.get<ListResponseModel<Fertilizer>>(getAllPath, { params: parameters })
  }
}
