import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Sheep } from '../models/sheep';

@Injectable({
  providedIn: 'root'
})
export class SheepsService {
  apiUrl = "http://localhost:45523/api/";
  constructor(private httpClient: HttpClient) { }

  getAllSheeps(): Observable<ListResponseModel<Sheep>> {
    let getAllPath = this.apiUrl + "sheep/getall";
    return this.httpClient.get<ListResponseModel<Sheep>>(getAllPath);
  }

  addSheep(sheepModel: Sheep): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "sheep/add", sheepModel
    );
  }

  deleteSheep(sheepModel: Sheep): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "sheep/delete", sheepModel
    );
  }

  updateSheep(sheepModel: Sheep): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "sheep/update", sheepModel);
  }

}
