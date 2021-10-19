import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fertilizer } from '../models/fertilizer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FertilizersService {

  apiUrl: string = "http://localhost:45523/api/"
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
}
