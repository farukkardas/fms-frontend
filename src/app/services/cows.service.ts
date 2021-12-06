import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cow } from '../models/cow';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CowsService {
  apiUrl = "http://localhost:5000/api/cow/";
  constructor(private httpClient: HttpClient) { }

  getAllCows(): Observable<ListResponseModel<Cow>> {
    let getAllPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Cow>>(getAllPath)
      ;
  }

  addCow(cowModel: Cow): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "add";

    return this.httpClient.post<ResponseModel>(
      getAllPath, cowModel
    );
  }

  deleteCow(cowModel: Cow): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(
      getAllPath, cowModel
    );
  }

  getCow(cowId: string): Observable<SingleResponseModel<Cow>> {
    let getAllPath = this.apiUrl + "getbyid";
    return this.httpClient.get<SingleResponseModel<Cow>>(getAllPath + cowId);
  }

  updateCow(cowModel: Cow): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "update";

    return this.httpClient.post<ResponseModel>(getAllPath, cowModel);
  }

  getUserCows(): Observable<ListResponseModel<Cow>> {
    let getAllPath = this.apiUrl + "getusercows";
    return this.httpClient.get<ListResponseModel<Cow>>(getAllPath)

  }

}
