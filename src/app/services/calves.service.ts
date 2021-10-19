import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calf } from '../models/calf';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CalvesService {
  apiUrl = "http://localhost:45523/api/";
  constructor(private httpClient: HttpClient) { }

  getAllCalves(): Observable<ListResponseModel<Calf>> {
    let getAllPath = this.apiUrl + "calves/getall";
    return this.httpClient.get<ListResponseModel<Calf>>(getAllPath);
  }

  addCalf(calfModel: Calf): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "calves/add", calfModel
    );
  }

  deleteCalf(calfModel: Calf): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "calves/delete", calfModel
    );
  }

  updateCalf(calfModel:Calf):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "calves/update",calfModel);
  }

}
