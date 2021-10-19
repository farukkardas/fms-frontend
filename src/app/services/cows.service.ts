import { HttpClient } from '@angular/common/http';
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
  apiUrl = "http://localhost:45523/api/";
  constructor(private httpClient: HttpClient) { }

  getAllCows(): Observable<ListResponseModel<Cow>> {
    let getAllPath = this.apiUrl + "cow/getall";
    return this.httpClient.get<ListResponseModel<Cow>>(getAllPath)
      ;
  }

  addCow(cowModel: Cow): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "cow/add", cowModel
    );
  }

  deleteCow(cowModel: Cow): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "cow/delete", cowModel
    );
  }

  getCow(cowId: string): Observable<SingleResponseModel<Cow>> {
    return this.httpClient.get<SingleResponseModel<Cow>>(this.apiUrl + "cow/getbyid" + cowId);
  }

  updateCow(cowModel: Cow): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cow/update", cowModel);
  }

}
