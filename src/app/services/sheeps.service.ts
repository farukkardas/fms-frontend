import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Sheep } from '../models/sheep';

@Injectable({
  providedIn: 'root'
})
export class SheepsService {
  apiUrl = "http://localhost:5000/api/sheep/";
  constructor(private httpClient: HttpClient) { }

  getAllSheeps(): Observable<ListResponseModel<Sheep>> {
    let getAllPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Sheep>>(getAllPath);
  }

  addSheep(sheepModel: Sheep): Observable<ResponseModel> {
    let allPath = this.apiUrl + "add";

    return this.httpClient.post<ResponseModel>(
      allPath, sheepModel
    );
  }

  deleteSheep(sheepModel: Sheep): Observable<ResponseModel> {
    let allPath = this.apiUrl + "delete";

    return this.httpClient.post<ResponseModel>(
     allPath, sheepModel
    );
  }

  updateSheep(sheepModel: Sheep): Observable<ResponseModel> {
    let allPath = this.apiUrl + "update";

    return this.httpClient.post<ResponseModel>(
      allPath, sheepModel);
  }

  getUserSheeps() : Observable<ListResponseModel<Sheep>> {
    let getAllPath = this.apiUrl + "getusersheeps";

    return this.httpClient.get<ListResponseModel<Sheep>>(getAllPath)

  }
}
